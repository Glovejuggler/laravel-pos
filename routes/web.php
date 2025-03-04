<?php

use Carbon\Carbon;
use App\Models\Item;
use Inertia\Inertia;
use App\Models\Costing;
use App\Models\Category;
use App\Models\SoldItem;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\POS;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

if (config('app.client') == 'Sawadeecup') {
    require __DIR__.'/sawadeecup.php';
} else {
    require __DIR__.'/uptop.php';
}

Route::get('/dashboard', function () {
    $soldItemsCount = SoldItem::whereHas('transaction', function ($query) {
        $query->onlyTrashed()->where('created_at', '>=', Carbon::now()->subDays(6)->startOfDay());
    })->sum('quantity');
    return Inertia::render('Dashboard', [
        'items' => Item::count(),
        'sold' => $soldItemsCount,
        'orders' => Transaction::onlyTrashed()->where('created_at', '>=', Carbon::now()->subDays(6)->startOfDay())->count()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{id}/destroy', [UserController::class, 'destroy'])->name('users.destroy');
    
    Route::post('/category', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/category/{id}/update', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/category/{category}/delete', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/items/{category?}', [ItemController::class, 'index'])->name('items.index');
    Route::get('/item/create', [ItemController::class, 'create'])->name('items.create');
    Route::post('/item/store', [ItemController::class, 'store'])->name('items.store');
    Route::get('/items/{id}/show', [ItemController::class, 'show'])->name('items.show');
    Route::post('/items/{item}/update', [ItemController::class, 'update'])->name('items.update');
    Route::delete('/item/delete/{item}', [ItemController::class, 'destroy'])->name('items.destroy');

    Route::get('/kitchen', [POS::class, 'kitchen'])->name('kitchen');
    Route::delete('/order/{id}/cancel', [TransactionController::class, 'raze'])->name('order.cancel');
    Route::delete('/order/{id}/delete', [TransactionController::class, 'destroy'])->name('order.done');

    Route::get('unit_sales/{category?}', [ReportsController::class, 'unitSales'])->name('unit.sales');
    Route::get('inventory_costing/{month?}', [ReportsController::class, 'costing'])->name('inventory.costing');

    Route::get('sales', [TransactionController::class, 'index'])->name('sales');
    Route::get('/pos', [POS::class, 'index'])->name('pos');
    Route::get('receipt/{id}', [TransactionController::class, 'show'])->name('receipt');

    Route::post('/transact', [TransactionController::class, 'store'])->name('transaction.save');
    Route::get('order/{id}', [TransactionController::class, 'show'])->name('order.get');

    Route::get('expenses', [ExpenseController::class, 'index'])->name('expenses.index');
    Route::get('expenses/create', [ExpenseController::class, 'create'])->name('expenses.create');
    Route::post('expenses', [ExpenseController::class, 'store'])->name('expenses.store');
    Route::post('expenses/import', [ExpenseController::class, 'import'])->name('expenses.import');
    Route::put('expenses/{expense}', [ExpenseController::class, 'update'])->name('expenses.update');
    Route::delete('expense/{expense}', [ExpenseController::class, 'destroy'])->name('expenses.destroy');
});


require __DIR__.'/auth.php';
