<?php

namespace App\Http\Controllers;

use App\Models\SoldItem;
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
        $transactions = Transaction::onlyTrashed()
                        ->filter([
                            'date' => $request->date ? $request->date : today(),
                            'search' => $request->search
                        ])
                        ->get();
        // $sold = SoldItem::whereBelongsTo($transactions)
        //                 ->selectRaw('item_id, sum(quantity) as total_sold')
        //                 ->groupBy('item_id')
        //                 ->get();

        // dd($sold);

        return inertia('Sales', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'date'])
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
                SoldItem::create([
                    'transaction_id' => $order->id,
                    'item_id' => $item['id'],
                    'quantity' => $item['count']
                ]);
            }
            
            OrderPlaced::dispatch($order);

            return [
                'message' => 'Order placed',
                'transaction' => $order,
            ];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
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
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return 'Order done';
    }

    /**
     * Force delete the specified resource
     */
    public function raze(Transaction $transaction)
    {
        SoldItem::where('transaction_id', $transaction->id)->delete();

        $transaction->forceDelete();

        return 'Order cancelled';
    }
}
