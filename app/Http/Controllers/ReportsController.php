<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Item;
use App\Models\Costing;
use App\Models\Category;
use App\Models\SoldItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    /**
     * Sales per product report
     */
    public function unitSales(Request $request, Category $category = null)
    {
        // dd($request);
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
    public function costing()
    {
        // $costing = Costing::withCount(['sold' => function ($query) {
        //     $query->whereDate('created_at', today());
        // }])->get();
        // $costing = Costing::withCount(['sold' => function ($q) {
        //     return $q->sold->quantity;
        // }])->get();
        // $costing = SoldItem::with(['item.costing', 'item'])
        //                     ->select('costings.name', 'items.*',
        //                             DB::raw('SUM(sold_items.quantity) as total_quantity'))
        //                     ->join('items', 'sold_items.item_id', '=', 'items.id')
        //                     ->join('costings', 'items.id', '=', 'costings.item_id')
        //                     ->groupBy('costings.name')
        //                     ->get();
        $costing = Costing::withSum(['sold as totalSold' => function ($q) {
            $q->whereHas('transaction', function ($q) {
                $q->onlyTrashed()->whereNotNull('deleted_at');
            });
        }],'quantity')->get();

        return inertia('Costing', [
            'costing' => $costing
        ]);
    }
}
