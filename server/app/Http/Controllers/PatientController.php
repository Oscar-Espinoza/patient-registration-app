<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Http\Requests\StorePatientRequest;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;


class PatientController extends Controller
{
  public function index()
  {
    $patients = Patient::all();
    return response()->json($patients);
  }

  public function store(StorePatientRequest $request)
  {
    $validated = $request->validated();
    $file = $request->file('document_photo');
    $path = $file->store('documents', 'public');

    $patient = new Patient([
      'name' => $validated['name'],
      'email' => $validated['email'],
      'phone_number' => $validated['phone_number'],
      'country_code' => $validated['country_code'],
      'document_photo' => $path,
      'address' => $request['address'],
    ]);

    $patient->save();

    // event(new Registered($patient));

    return response()->json($patient, 201);
  }

  public function verify(Request $request)
  {
    $userID = $request['id'];
    $user = Patient::findOrFail($userID);
    $user->markEmailAsVerified();
    return response()->json(['message' => 'Email verified successfully']);
  }

  public function resend(Request $request)
  {
    $patient = Patient::find($request->user()->id);
    if ($patient->hasVerifiedEmail()) {
      return response()->json(['message' => 'Email already verified']);
    }

    $patient->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification email resent']);
  }
}
