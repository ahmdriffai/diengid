<?php

use App\Http\Controllers\Admin\HomestayController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::prefix('homestays')->name('homestays.')->controller(HomestayController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
    });
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/users', [UserController::class, 'index']);
