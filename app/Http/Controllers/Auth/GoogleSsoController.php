<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GoogleSsoController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        $state = Str::random(40);
        $request->session()->put('google_oauth_state', $state);

        $query = http_build_query([
            'client_id' => config('services.google.client_id'),
            'redirect_uri' => route('auth.google.callback'),
            'response_type' => 'code',
            'scope' => 'openid email profile',
            'state' => $state,
            'access_type' => 'offline',
            'prompt' => 'select_account',
        ]);

        return redirect()->away('https://accounts.google.com/o/oauth2/v2/auth?'.$query);
    }

    public function callback(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string'],
            'state' => ['required', 'string'],
        ]);

        $sessionState = (string) $request->session()->pull('google_oauth_state');
        $requestState = (string) $request->string('state');

        if ($sessionState === '' || ! hash_equals($sessionState, $requestState)) {
            return redirect()->route('login')->withErrors([
                'email' => 'Invalid Google login state. Please try again.',
            ]);
        }

        $tokenResponse = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'code' => $request->string('code')->toString(),
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'redirect_uri' => route('auth.google.callback'),
            'grant_type' => 'authorization_code',
        ]);

        if (! $tokenResponse->successful()) {
            return redirect()->route('login')->withErrors([
                'email' => 'Google login failed during token exchange.',
            ]);
        }

        $accessToken = (string) ($tokenResponse->json('access_token') ?? '');

        if ($accessToken === '') {
            return redirect()->route('login')->withErrors([
                'email' => 'Google did not return an access token.',
            ]);
        }

        $userInfoResponse = Http::withToken($accessToken)->get('https://openidconnect.googleapis.com/v1/userinfo');

        if (! $userInfoResponse->successful()) {
            return redirect()->route('login')->withErrors([
                'email' => 'Google login failed when fetching profile.',
            ]);
        }

        $googleUser = $userInfoResponse->json();
        $email = (string) ($googleUser['email'] ?? '');

        if ($email === '') {
            return redirect()->route('login')->withErrors([
                'email' => 'Google account does not provide an email.',
            ]);
        }

        $user = User::query()->firstOrNew([
            'email' => $email,
        ]);

        $user->name = (string) ($googleUser['name'] ?? $email);
        $user->google_id = (string) ($googleUser['sub'] ?? '');
        $user->google_avatar = (string) ($googleUser['picture'] ?? '');

        if (! $user->exists) {
            $user->password = Hash::make(Str::random(48));
        }

        if (($googleUser['email_verified'] ?? false) && $user->email_verified_at === null) {
            $user->email_verified_at = now();
        }

        $user->save();

        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect()->intended(route('home'));
    }
}
