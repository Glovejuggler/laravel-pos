<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DailySalesReportController extends Controller
{
    public function thisWeek(Request $request)
    {
        $chart = filter_var($request->query('chart', false), FILTER_VALIDATE_BOOLEAN);
        
        $start = Carbon::now()->startOfWeek()->startOfDay();
        $end = Carbon::now()->endOfWeek()->endOfDay();
        
        return $this->getData($start, $end, $chart);
    }
    
    public function last7Days(Request $request)
    {
        $chart = filter_var($request->query('chart', false), FILTER_VALIDATE_BOOLEAN);
        
        $start = Carbon::now()->subDays(6)->startOfDay();
        $end = Carbon::now();
        
        return $this->getData($start, $end, $chart);
    }
    
    public function lastWeek(Request $request)
    {
        $chart = filter_var($request->query('chart', false), FILTER_VALIDATE_BOOLEAN);

        $start = Carbon::now()->subWeek()->startOfWeek()->startOfDay();
        $end = Carbon::now()->subWeek()->endOfWeek()->endOfDay();

        return $this->getData($start, $end, $chart);
    }

    private function getData($from, $to, $chart)
    {
        $start = Carbon::parse($from);
        $end = Carbon::parse($to);

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
