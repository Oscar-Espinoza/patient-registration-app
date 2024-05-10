<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
  public function authorize(): bool
  {
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
      'name' => 'required|regex:/^[a-zA-Z\s]+$/',
      'email' => 'required|string|email|max:255|unique:patients,email|regex:/^[a-zA-Z0-9_.+-]+@gmail\.com$/',
      'phone_number' => 'required|regex:/^[0-9]+$/',
      'country_code' => 'required|regex:/^\+\d{1,4}$/',
      'document_photo' => 'required|file|mimes:jpg,jpeg|max:5120',
      'address.street' => 'string|max:255',
      'address.city' => 'string|max:255',
      'address.state' => 'string|max:255',
      'address.zip_code' => 'string|max:255',
      'address.country' => 'string|max:255',
    ];
  }

  public function messages()
  {
    return [
      'name.regex' => 'The name must only contain letters.',
      'email.regex' => 'The email must be a Gmail address (@gmail.com).',
      'phone_number.regex' => 'The phone number must contain only numbers.',
      'country_code.regex' => 'The country code must start with a plus sign and include up to 4 digits.',
      'document_photo.mimes' => 'The document must be a JPG image.',
    ];
  }
}
