<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OrdersReportController;
use App\Http\Controllers\API\DailySalesReportController;
use App\Http\Controllers\API\MonthlySalesReportController;
use App\Http\Controllers\API\ProductsSoldReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'reports'], function () {
    Route::get('/daily-sales/this-week', [DailySalesReportController::class, 'thisWeek']);
    Route::get('/daily-sales/last-7-days', [DailySalesReportController::class, 'last7Days']);
    Route::get('/daily-sales/last-week', [DailySalesReportController::class, 'lastWeek']);

    Route::get('/orders/this-week', [OrdersReportController::class, 'thisWeek']);
    Route::get('/orders/last-7-days', [OrdersReportController::class, 'last7days']);
    Route::get('/orders/last-week', [OrdersReportController::class, 'lastWeek']);
    Route::get('/orders/this-month', [OrdersReportController::class, 'thisMonth']);

    Route::get('/products-sold/this-week', [ProductsSoldReportController::class, 'thisWeek']);
    Route::get('/products-sold/last-7-days', [ProductsSoldReportController::class, 'last7days']);
    Route::get('/products-sold/last-week', [ProductsSoldReportController::class, 'lastWeek']);
    Route::get('/products-sold/this-month', [ProductsSoldReportController::class, 'thisMonth']);

    Route::get('/monthly-sales/last-6-months', [MonthlySalesReportController::class, 'last6Months']);
})->middleware('auth');