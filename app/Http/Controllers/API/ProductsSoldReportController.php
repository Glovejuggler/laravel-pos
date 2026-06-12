<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SoldItem;
use Carbon\Carbon;

class ProductsSoldReportController extends Controller
{
    public function thisWeek()
    {
        $start = Carbon::now()->startOfWeek()->startOfDay();
        $end = Carbon::now()->endOfWeek()->endOfDay();

        return $this->getData($start, $end);
    }

    public function last7Days()
    {
        $start = Carbon::now()->subDays(6)->startOfDay();
        $end = Carbon::now();

        return $this->getData($start, $end);
    }

    public function lastWeek()
    {
        $start = Carbon::now()->subWeek()->startOfWeek()->startOfDay();
        $end = Carbon::now()->subWeek()->endOfWeek()->endOfDay();

        return $this->getData($start, $end);
    }

    public function thisMonth()
    {
        $start = Carbon::now()->startOfMonth()->startOfDay();
        $end = Carbon::now()->endOfMonth()->endOfMonth();

        return $this->getData($start, $end);
    }

    private function getData($from, $to)
    {
        $data = SoldItem::whereHas('transaction', function ($query) use ($from, $to) {
            $query->onlyTrashed()->whereBetween('created_at', [$from, $to]);
        })->sum('quantity');

        return $data;
    }
}
