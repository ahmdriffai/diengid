<?php

namespace App\Http\Requests\Admin\HostProfile;

use App\Models\HostProfile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateHostProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var HostProfile $hostProfile */
        $hostProfile = $this->route('hostProfile');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($hostProfile->user_id, 'id')],
            'password' => ['nullable', 'confirmed', Password::min(8)],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'profile_picture_url' => ['nullable', 'url', 'max:2048'],
            'address' => ['nullable', 'string', 'max:255'],
            'bank_account_name' => ['nullable', 'string', 'max:255'],
            'bank_account_number' => ['nullable', 'string', 'max:255'],
            'ktp_number' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.unique' => 'Email has already been taken.',
            'password.confirmed' => 'Password confirmation does not match.',
        ];
    }
}
