<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Expense;
use App\Models\SoldCost;
use App\Models\SoldItem;
use App\Events\OrderDone;
use App\Events\OrderPlaced;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTransactionRequest;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->advanced) {
            $transactions = Transaction::onlyTrashed()
                ->whereBetween('created_at', [$request->advanced['from'], $request->advanced['to']])
                ->get();
            $net = Expense::where('type', 'Net')->whereBetween('created_at', [$request->advanced['from'], $request->advanced['to']])->get();
            $cogs = Expense::where('type', 'COGS')->whereBetween('created_at', [$request->advanced['from'], $request->advanced['to']])->get();
        } else {
            $transactions = Transaction::onlyTrashed()
                            ->filter([
                                'date' => $request->date ?: today(),
                            ])
                            ->get();
            $net = Expense::where('type', 'net')->whereDate('created_at', $request->date ? Carbon::parse($request->date): today())->get();
            $cogs = Expense::where('type', 'COGS')->whereDate('created_at', $request->date ? Carbon::parse($request->date) : today())->get();
        }
        // dd($transactions);

        return inertia('Sales', [
            'transactions' => $transactions,
            'expenses' => [
                'net' => $net,
                'cogs' => $cogs,
            ],
            'filters' => $request->only(['date', 'advanced']),
            'total' => [
                'gross' => $transactions->sum('gross'),
                'cost' => $transactions->sum('cost'),
            ],
            'batchDates' => $request->advanced
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        // if ($request->wantsJson()) {
        //     return $request;
        // }
        
        if ($request->wantsJson()) {
            $order = Transaction::create($request->validated());
    
            foreach ($request->items as $item) {
                $soldItem = SoldItem::create([
                    'transaction_id' => $order->id,
                    'name' => $item['name'],
                    'category' => $item['category']['name'],
                    'price' => $item['price'],
                    'quantity' => $item['count']
                ]);

                foreach ($item['costing'] as $cost) {
                    SoldCost::create([
                        'sold_item_id' => $soldItem->id,
                        'name' => $cost['name'],
                        'cost' => $cost['cost'],
                    ]);
                }
            }
            
            if (env('KITCHEN')) {
                OrderPlaced::dispatch($order->id);
            } else {
                $order->delete();
            }

            return [
                'message' => 'Order placed',
                'transaction' => $order,
            ];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        if ($request->wantsJson()) {
            return Transaction::findOrFail($id);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        if (env('KITCHEN')) {
            OrderDone::dispatch($id);
        }

        return 'Order done';
    }

    /**
     * Force delete the specified resource
     */
    public function raze($id, Request $request)
    {
        $transaction = Transaction::withTrashed()->findOrFail($id);
        SoldCost::whereIn('sold_item_id', SoldItem::whereBelongsTo($transaction)->pluck('id'))->delete();
        SoldItem::where('transaction_id', $transaction->id)->delete();

        $transaction->forceDelete();

        if (env('KITCHEN')) {
            OrderDone::dispatch($id);
        }

        if ($request->wantsJson()) {
            return 'Order cancelled';
        } else {
            return redirect()->back();
        }
    }
}
