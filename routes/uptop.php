<?php

use App\Models\Category;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('clients.uptop.home.index');
})->name('home');

Route::get('/menu', function () {
    $categories = Category::with(['items' => function ($query) {
        $query->where('menu', true);
    }])->get()->map(function ($category) {
        return (object) [
            'name' => ucwords(mb_strtolower($category->name)),
            'items' => $category->items->map(function ($item) {
                return (object) [
                    'name' => ucwords(mb_strtolower($item->name)),
                    'menu_name' => $item->menu_name ? ucwords(mb_strtolower($item->menu_name)) : null,
                    'price' => $item->price,
                ];
            }),
        ];
    })->filter(fn ($category) => $category->items->isNotEmpty());

    return view('clients.uptop.home.menu', [
        'menu' => (object) ['categories' => $categories],
    ]);
})->name('menu');

Route::get('/contacts', function () {
    return view('clients.uptop.home.contacts');
})->name('contacts');
