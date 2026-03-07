<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HostProfile\StoreHostProfileRequest;
use App\Http\Requests\Admin\HostProfile\UpdateHostProfileRequest;
use App\Models\HostProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class HostProfileController extends Controller
{
    public function index(Request $request): Response
    {
        $query = HostProfile::query()
            ->with('user:id,name,email')
            ->latest('created_at');

        if ($request->filled('key')) {
            $key = trim((string) $request->input('key'));

            $query->where(function ($builder) use ($key): void {
                $builder
                    ->whereLike('phone_number', '%'.$key.'%', caseSensitive: false)
                    ->orWhereLike('address', '%'.$key.'%', caseSensitive: false)
                    ->orWhereLike('bank_account_name', '%'.$key.'%', caseSensitive: false)
                    ->orWhereHas('user', function ($userQuery) use ($key): void {
                        $userQuery
                            ->whereLike('name', '%'.$key.'%', caseSensitive: false)
                            ->orWhereLike('email', '%'.$key.'%', caseSensitive: false);
                    });
            });
        }

        $hostProfiles = $query
            ->paginate($request->integer('size', 10))
            ->withQueryString();

        return Inertia::render('admin/host-profiles/index', [
            'hostProfiles' => $hostProfiles,
            'filters' => $request->only(['key', 'size']),
        ]);
    }

    public function store(StoreHostProfileRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $user = \App\Models\User::query()->create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            HostProfile::query()->create([
                'user_id' => $user->id,
                'phone_number' => $validated['phone_number'] ?? null,
                'profile_picture_url' => $validated['profile_picture_url'] ?? null,
                'address' => $validated['address'] ?? null,
                'bank_account_name' => $validated['bank_account_name'] ?? null,
                'bank_account_number' => $validated['bank_account_number'] ?? null,
                'ktp_number' => $validated['ktp_number'] ?? null,
                'bio' => $validated['bio'] ?? null,
            ]);
        });

        return back()->with('success', 'Host profile created successfully.');
    }

    public function update(UpdateHostProfileRequest $request, HostProfile $hostProfile): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $hostProfile): void {
            $hostProfile->user()->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                ...(! empty($validated['password']) ? ['password' => Hash::make($validated['password'])] : []),
            ]);

            $hostProfile->update([
                'phone_number' => $validated['phone_number'] ?? null,
                'profile_picture_url' => $validated['profile_picture_url'] ?? null,
                'address' => $validated['address'] ?? null,
                'bank_account_name' => $validated['bank_account_name'] ?? null,
                'bank_account_number' => $validated['bank_account_number'] ?? null,
                'ktp_number' => $validated['ktp_number'] ?? null,
                'bio' => $validated['bio'] ?? null,
            ]);
        });

        return back()->with('success', 'Host profile updated successfully.');
    }

    public function destroy(HostProfile $hostProfile): RedirectResponse
    {
        $hostProfile->delete();

        return back()->with('success', 'Host profile deleted successfully.');
    }
}
