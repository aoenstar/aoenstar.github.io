<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $images = GalleryImage::orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('marketing/gallery', [
            'images' => $images,
        ]);
    }

    public function adminIndex()
    {
        $images = GalleryImage::orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('marketing/admin', [
            'galleryImages' => $images,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:10240', // 10MB max
            'category' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
        ]);

        $path = $request->file('image')->store('gallery', 'public');

        $image = GalleryImage::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $path,
            'category' => $request->category ?? 'project',
            'location' => $request->location,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => GalleryImage::max('sort_order') + 1,
        ]);

        return back()->with('success', 'Image uploaded successfully.');
    }

    public function destroy($id)
    {
        $galleryImage = GalleryImage::findOrFail($id);
        Storage::disk('public')->delete($galleryImage->image_path);
        $galleryImage->delete();

        return back()->with('success', 'Image deleted successfully.');
    }
}
