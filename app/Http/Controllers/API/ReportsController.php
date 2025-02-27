<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReportsController extends Controller
{
    public function dailySales(Request $request)
    {
        $chart = $request->query('chart') ?? false;

        $start = Carbon::parse($request->query('from'));
        $end = Carbon::parse($request->query('to'));

        $data = Transaction::with('items')->onlyTrashed()
                ->whereBetween('created_at', [$start, $end])
                ->get()
                ->groupBy(fn($transaction) => $transaction->created_at->format('m-d'))
                ->map(fn($transactions) => [
                    'total_cost' => $transactions->flatMap->items->sum('cost'),
                    'total_net' => $transactions->flatMap->items->sum('gross') - $transactions->flatMap->items->sum('cost'),
                ]);
        
        if (!$chart) {
            return response()->json($data);
        } else {
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
}
