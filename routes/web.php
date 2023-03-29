<?php

use App\Http\Controllers\DasborController;
use App\Http\Controllers\EntrantController;
use App\Http\Controllers\PhotoController;
use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

Route::resource('photos', PhotoController::class)->only([
    'index', 'show'
]);

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', [DasborController::class, 'show'])
                ->name('dashboard');
    Route::post('/dashboard', [DasborController::class, 'store']);

    Route::resource('photos', PhotoController::class)->except([
        'index', 'show'
    ]);
});

require_once __DIR__.'/auth.php';

if (cache('pb') == 'ppdb') {
    Route::get('ppdb', [EntrantController::class, 'create'])
                ->name('ppdb');
    Route::resource('ppdb', EntrantController::class)->only([
        'store', 'show', 'edit'
    ]);
}
