<?php 

use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return view('clients.sawadeecup.home.index');
})->name('home');