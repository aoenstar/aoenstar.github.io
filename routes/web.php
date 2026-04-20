<?php

use App\Http\Controllers\GalleryController;
use App\Models\GalleryImage;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Marketing pages
Route::inertia('/', 'marketing/home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/services', 'marketing/services')->name('services');
Route::inertia('/commercial', 'marketing/commercial')->name('commercial');
Route::inertia('/contact', 'marketing/contact')->name('contact');
Route::inertia('/testimonials', 'marketing/testimonials')->name('testimonials');

// Gallery
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

// Admin routes
Route::get('/admin', function () {
    return inertia('marketing/admin', [
        'galleryImages' => GalleryImage::orderBy('sort_order')->orderBy('created_at', 'desc')->get(),
    ]);
})->name('admin');

Route::post('/admin/gallery', [GalleryController::class, 'store'])->name('admin.gallery.store');
Route::delete('/admin/gallery/{id}', [GalleryController::class, 'destroy'])->name('admin.gallery.destroy');

Route::middleware(['auth'])->group(function () {
    Route::inertia('/account', 'marketing/account')->name('account');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
