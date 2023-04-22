<?php

use App\Http\Controllers\EntrantController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\StudentController;
use App\Models\Audit;
use App\Models\Page;
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
    $carousel = featured_pages('carousel');
    $carousel = array_filter($carousel, fn($p) => !empty($p->media));
    $carousel = array_values($carousel);
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'carousel' => $carousel,
        'featured' => featured_pages('featured', true),
    ]);
})->name('beranda');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', function() {
        return Inertia::render('Dashboard', [
            'auditLog' => Audit::with('user:id,name')->orderByDesc('id')
                                            ->cursorPaginate()
                                            ->withPath('/audits'),
        ]);
    })->name('dashboard');

    Route::get('/audits', function() {
        return Audit::with('user')->orderByDesc('id')->cursorPaginate(8);
    });

    Route::get('/tools', [SiteController::class, 'show'])
                ->name('tools');
    Route::post('/tools', [SiteController::class, 'store']);

    Route::resource('media', MediaController::class)->except([
        'index', 'show', 'edit',
    ]);

    Route::resource('pages', PageController::class)->only([
        'store', 'update', 'destroy',
    ]);

    Route::resource('students', StudentController::class)->only([
        'index', 'store', 'destroy',
    ]);

    Route::get('ppdb', [EntrantController::class, 'create'])->name('ppdb.create');

    Route::resource('ppdb', EntrantController::class)->only([
        'show', 'edit', 'store', 'destroy'
    ]);
});

Route::get('media', [MediaController::class, 'index'])
            ->name('media.index');
Route::get('media/{id}', [MediaController::class, 'show'])
            ->middleware('cache.headers:public;max_age=2628000;etag');

Route::resource('pages', PageController::class)->only([
    'index', 'show',
]);

require_once __DIR__.'/auth.php';
