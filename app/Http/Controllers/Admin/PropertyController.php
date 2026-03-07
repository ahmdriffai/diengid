<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Property\StorePropertyRequest;
use App\Http\Requests\Admin\Property\UpdatePropertyRequest;
use App\Models\HostProfile;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Property::query()
            ->with('hostProfile')
            ->latest('created_at');

        if ($request->filled('key')) {
            $key = trim((string) $request->input('key'));

            $query->where(function ($builder) use ($key): void {
                $builder
                    ->whereLike('name', '%'.$key.'%', caseSensitive: false)
                    ->orWhereLike('address', '%'.$key.'%', caseSensitive: false);
            });
        }

        if ($request->filled('host_id')) {
            $query->where('host_id', (string) $request->input('host_id'));
        }

        $properties = $query
            ->paginate($request->integer('size', 10))
            ->withQueryString();

        $hosts = HostProfile::query()
            ->with('user:id,name')
            ->get(['id', 'user_id'])
            ->map(function (HostProfile $host): array {
                return [
                    'id' => $host->id,
                    'name' => $host->user?->name ?? $host->id,
                ];
            });

        return Inertia::render('admin/properties/index', [
            'properties' => $properties,
            'hosts' => $hosts,
            'filters' => $request->only(['key', 'host_id', 'size']),
        ]);
    }

    public function create(): Response
    {
        $hosts = HostProfile::query()
            ->with('user:id,name')
            ->get(['id', 'user_id'])
            ->map(function (HostProfile $host): array {
                return [
                    'id' => $host->id,
                    'name' => $host->user?->name ?? $host->id,
                ];
            });

        return Inertia::render('admin/properties/create', [
            'hosts' => $hosts,
        ]);
    }

    public function edit(Property $property): Response
    {
        $hosts = HostProfile::query()
            ->with('user:id,name')
            ->get(['id', 'user_id'])
            ->map(function (HostProfile $host): array {
                return [
                    'id' => $host->id,
                    'name' => $host->user?->name ?? $host->id,
                ];
            });

        return Inertia::render('admin/properties/edit', [
            'property' => $property,
            'hosts' => $hosts,
        ]);
    }

    public function store(StorePropertyRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $hostId = $validated['host_id'] ?? null;

            if (empty($hostId)) {
                $user = User::query()->create([
                    'name' => $validated['user_name'],
                    'email' => $validated['user_email'],
                    'password' => Hash::make($validated['user_password']),
                ]);

                $hostProfile = HostProfile::query()->create([
                    'user_id' => $user->id,
                    'phone_number' => $validated['host_phone_number'] ?? null,
                    'profile_picture_url' => $validated['host_profile_picture_url'] ?? null,
                    'address' => $validated['host_address'] ?? null,
                    'bank_account_name' => $validated['host_bank_account_name'] ?? null,
                    'bank_account_number' => $validated['host_bank_account_number'] ?? null,
                    'ktp_number' => $validated['host_ktp_number'] ?? null,
                    'bio' => $validated['host_bio'] ?? null,
                ]);

                $hostId = $hostProfile->id;
            }

            Property::query()->create([
                'host_id' => $hostId,
                'name' => $validated['name'],
                'address' => $validated['address'],
                'description' => $validated['description'],
                'image_url' => $validated['image_url'] ?? null,
                'lat' => $validated['lat'] ?? null,
                'lng' => $validated['lng'] ?? null,
                'type' => $validated['type'],
            ]);
        });

        return redirect()->route('admin.properties.index')->with('success', 'Property created successfully.');
    }

    public function update(UpdatePropertyRequest $request, Property $property): RedirectResponse
    {
        $property->update($request->validated());

        return redirect()->route('admin.properties.index')->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property): RedirectResponse
    {
        $property->delete();

        return back()->with('success', 'Property deleted successfully.');
    }
}
