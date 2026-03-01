<?php

use App\Http\Controllers\Admin\HomestayController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\GoogleSsoController;
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

Route::get('/search', function () {
    return Inertia::render('search');
})->name('search');

Route::get('/route', function () {
    return Inertia::render('route');
})->name('route');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');

    Route::get('/auth/google/redirect', [GoogleSsoController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [GoogleSsoController::class, 'callback'])->name('auth.google.callback');

    // homestay detail page
    Route::get('/homestays/id', function () {
        return Inertia::render('client/homestay/detail');
    })->name('homestays.detail');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
    });
});
