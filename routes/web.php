<?php

use App\Models\Item;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Http\Controllers\POS;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // $t = Transaction::onlyTrashed()->get();
    // $time = 0;
    // foreach ($t as $tr) {
    //     $time += $tr->deleted_at->diffInSeconds($tr->created_at);
    // }

    // dd($time/$t->count());
    return Inertia::render('Dashboard', [
        'items' => Item::count(),
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

    Route::get('/kitchen', function () {
        return inertia('Kitchen', [
            'orders' => Transaction::all()
        ]);
    })->name('kitchen');
    Route::delete('/order/{transaction}/cancel', [TransactionController::class, 'raze'])->name('order.cancel');
    Route::delete('/order/{transaction}/delete', [TransactionController::class, 'destroy'])->name('order.done');

    Route::get('sales', [TransactionController::class, 'index'])->name('sales');
    Route::get('/pos', [POS::class, 'index'])->name('pos');
    Route::get('receipt/{id}', [TransactionController::class, 'show'])->name('receipt');
});

Route::post('/transact', [TransactionController::class, 'store'])->name('transaction.save');

require __DIR__.'/auth.php';
