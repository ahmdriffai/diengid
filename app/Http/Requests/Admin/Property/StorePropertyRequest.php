<?php

namespace App\Http\Requests\Admin\Property;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return $this->user() !== null;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'host_id' => ['nullable', 'uuid', 'exists:host_profiles,id'],
            'user_name' => ["nullable",Rule::requiredIf(fn (): bool => ! $this->filled('host_id')), 'string', 'max:255'],
            'user_email' => ["nullable",
                Rule::requiredIf(fn (): bool => ! $this->filled('host_id')),
                'email',
                'max:255',
                'unique:users,email',
            ],
            'user_password' => ["nullable",Rule::requiredIf(fn (): bool => ! $this->filled('host_id')), 'confirmed', Password::min(8)],
            'host_phone_number' => ['nullable', 'string', 'max:255'],
            'host_profile_picture_url' => ['nullable', 'max:2048'],
            'host_address' => ['nullable', 'string', 'max:255'],
            'host_bank_account_name' => ['nullable', 'string', 'max:255'],
            'host_bank_account_number' => ['nullable', 'string', 'max:255'],
            'host_ktp_number' => ['nullable', 'string', 'max:255'],
            'host_bio' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image_url' => ['nullable', 'url', 'max:2048'],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'type' => ['required', 'in:homestay,villa,guesthost'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'host_id.exists' => 'Selected host profile is invalid.',
            'user_name.required' => 'User name is required when host is not selected.',
            'user_email.required' => 'User email is required when host is not selected.',
            'user_email.unique' => 'Email has already been taken.',
            'user_password.required' => 'User password is required when host is not selected.',
            'user_password.confirmed' => 'User password confirmation does not match.',
            'name.required' => 'Property name is required.',
            'address.required' => 'Property address is required.',
            'description.required' => 'Property description is required.',
            'type.required' => 'Property type is required.',
        ];
    }
}
