<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/patient', [PatientController::class, 'store']);
Route::get('/email/verify/{id}', [PatientController::class, 'verify'])->name('verification.verify');
Route::post('/email/resend', [PatientController::class, 'resend'])->name('verification.resend');

