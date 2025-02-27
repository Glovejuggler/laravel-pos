<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Item;
use App\Models\Costing;
use App\Models\Category;
use App\Models\SoldCost;
use App\Models\SoldItem;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ReportsController extends Controller
{
    /**
     * Sales per product report
     */
    public function unitSales(Request $request, Category $category = null)
    {
        // dd(SoldItem::all(), SoldCost::all());
        if (!Gate::allows('admin')) {
            abort(403);
        }

        if ($category) {
            $date = $request->date ? Carbon::parse($request->date) : today();
            return inertia('UnitSales', [
                'items' => Item::where('category_id',$category->id)
                            ->withSum(['sales as total_quantity' => function ($query) use ($date) {
                                $query->whereDate('created_at', $date);
                            }], 'quantity')
                            ->orderBy('total_quantity', 'desc')
                            ->filter($request->only(['search']))
                            ->get(),
                'categories' => Category::all(),
                'filters' => $request->only(['date', 'search']),
                'cat' => $category
            ]);
        } else {
            $category = Category::first();
            if ($category) {
                return redirect()->route('unit.sales', $category);
            } else {
                return inertia('UnitSales', [
                    'categories' => Category::all()
                ]);
            }
        }
    }

    /**
     * Inventory costing report
     */
    public function costing($month = null)
    {
        if (!Gate::allows('admin')) {
            abort(403);
        }
        
        $m = Carbon::parse($month) ?: today();

        $costing = SoldCost::withSum(['sold as totalSold' => function ($q) use ($m) {
            $q->whereHas('transaction', function ($q) use ($m) {
                $q->onlyTrashed()
                    ->whereNotNull('deleted_at')
                    ->whereMonth('deleted_at', $m->month)
                    ->whereYear('deleted_at', $m->year);
            });
        }],'quantity')->get();

        $merged = $costing->groupBy(function ($g) {
            return strtoupper($g->name);
        })->map(function ($group) {
            return [
                'name' => $group->first()->name,
                'total' => $group->sum(function ($c) {
                    return $c->totalSold * $c->cost;
                }),
            ];
        });

        return inertia('Costing', [
            'costing' => $merged,
            'total' => $merged->sum('total')
        ]);
    }

    public function cost(Request $request)
    {
        if ($request->advanced) {
            
        } else {
            $date = $request->date ? Carbon::parse($request->date) : today();
            $costing = SoldCost::withSum(['sold as totalSold' => function ($q) use ($date) {
                $q->whereHas('transaction', function ($q) use ($date) {
                    $q->onlyTrashed()
                        ->whereNotNull('deleted_at')
                        ->whereMonth('deleted_at', $date->month)
                        ->whereYear('deleted_at', $date->year);
                });
            }],'quantity')->get();
        }

        $merged = $costing->groupBy(function ($g) {
            return strtoupper($g->name);
        })->map(function ($group) {
            return [
                'name' => $group->first()->name,
                'total' => $group->sum(function ($c) {
                    return $c->totalSold * $c->cost;
                }),
            ];
        });
        
        return inertia('Costing', [
            'costing' => $merged,
            'total' => $merged->sum('total')
        ]);
    }

    /**
     * Sales from the last 7 days
     */
    public function fetchLast7DaysSales()
    {
        $data = Transaction::with('items')->onlyTrashed()
                ->where('created_at', '>=', Carbon::now()->subDays(6)->startOfDay())
                ->get()
                ->groupBy(fn($transaction) => $transaction->created_at->format('m-d'))
                ->map(fn($transactions) => [
                    'total_cost' => $transactions->flatMap->items->sum('cost'),
                    'total_net' => $transactions->flatMap->items->sum('gross') - $transactions->flatMap->items->sum('cost'),
                ]);

        $dates = collect(range(0, 6))->map(function ($i) use ($data) {
            $date = Carbon::now()->subDays(6 - $i)->format('m-d');
            return [
                'date' => $date,
                'total_net' => $data[$date]['total_net'] ?? 0,
                'total_cost' => $data[$date]['total_cost'] ?? 0,
            ];
        });

        return response()->json([
            'labels' => $dates->pluck('date'),
            'net' => $dates->pluck('total_net'),
            'cost' => $dates->pluck('total_cost'),
        ]);
    }

    /**
     * Sales this week
     */
    public function thisWeek()
    {
        $start = Carbon::now()->startOfWeek()->startOfDay();
        $data = Transaction::with('items')->onlyTrashed()
                ->whereBetween('created_at', [$start, Carbon::now()->endOfWeek()->endOfDay()])
                ->get()
                ->groupBy(fn($transaction) => $transaction->created_at->format('m-d'))
                ->map(fn($transactions) => [
                    'total_cost' => $transactions->flatMap->items->sum('cost'),
                    'total_net' => $transactions->flatMap->items->sum('gross') - $transactions->flatMap->items->sum('cost'),
                ]);

        $dates = collect(range(0, 6))->map(function ($i) use ($data, $start) {
            $date = $start->copy()->addDays($i)->format('m-d');
            return [
                'date' => $date,
                'total_net' => $data[$date]['total_net'] ?? 0,
                'total_cost' => $data[$date]['total_cost'] ?? 0,
            ];
        });

        return response()->json([
            'labels' => $dates->pluck('date'),
            'net' => $dates->pluck('total_net'),
            'cost' => $dates->pluck('total_cost'),
        ]);
    }
}
