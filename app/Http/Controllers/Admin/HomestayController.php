<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Homestay;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomestayController extends Controller
{
    //
    public function index(Request $request) {
        $query = Homestay::query();

        if ($request->filled('key')) {
            $query->whereLike('name', '%'.trim($request->key).'%', caseSensitive: false);
        }

        $homestays = $query
        ->paginate($request->size ?? 10)
        ->withQueryString();

        return Inertia::render('admin/homestays/index', [
            'homestays' => $homestays,
            'filters' => $request->only(['key', 'size'])
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'address' => ['required', 'string', 'max:255'],
        'owner' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'image_url' => ['nullable', 'url', 'max:2048'],
        'whatsapp_number' => ['required', 'string', 'max:20'],
        ]);

        Homestay::create($validated);

        return back()->with('success', 'Homestay created successfully');
    }

}
