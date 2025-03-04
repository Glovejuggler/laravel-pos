<?php 

use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return view('clients.uptop.home.index');
})->name('home');

Route::get('/menu', function() {
    $menuPath = public_path('menu.json');
    $menuContents = file_get_contents($menuPath);
    $menu = json_decode($menuContents);

    // dd($menu->products);

    // $menu = Item::with('category')->where('menu', true)->get();
    
    return view('clients.uptop.home.menu', [
        'menu' => $menu->products
    ]);
})->name('menu');

Route::get('/contacts', function() {
    return view('clients.uptop.home.contacts');
})->name('contacts');