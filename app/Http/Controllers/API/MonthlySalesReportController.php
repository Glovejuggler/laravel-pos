<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class MonthlySalesReportController extends Controller
{
    public function last6Months(Request $request)
    {
        $chart = filter_var($request->query('chart', false), FILTER_VALIDATE_BOOLEAN);

        $start = Carbon::now()->subMonths(6)->startOfMonth()->startOfDay();
        $end = Carbon::now()->endOfMonth()->endOfDay();

        return Cache::remember('last-6-months', now()->addHour(1), function() use ($start, $end, $chart) {
            return $this->getData($start, $end, $chart);
        });
    }

    public function getData($from, $to, $chart)
    {
        $start = Carbon::parse($from);
        $end = Carbon::parse($to);

        $data = Transaction::with('items')->onlyTrashed()
                ->whereBetween('created_at', [$start, $end])
                ->get()
                ->groupBy(fn($transaction) => $transaction->created_at->format('F Y'))
                ->map(fn($transactions) => [
                    'total_cost' => $transactions->flatMap->items->sum('cost'),
                    'total_net' => $transactions->flatMap->items->sum('gross') - $transactions->flatMap->items->sum('cost'),
        ]);

        if (!$chart) {
            return response()->json($data);
        } else {
            $dates = collect(range(0, $start->diffInMonths($end)))->map(function ($i) use ($data, $start) {
                $date = $start->copy()->addMonths($i)->format('F Y');
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
