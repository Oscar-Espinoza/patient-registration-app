<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StorePatientTest extends TestCase
{
  use RefreshDatabase;
  /**
   * A basic feature test example.
   */
  public function test_get_patients(): void
  {
    $response = $this->get('/api/patients');

    $response->assertStatus(200);
  }

  public function testCreatePatientWithIncorrectData(): void
{
    $patientData = [
        'email' => 'invalidEmail@invalid.com',
        'phone_number' => 'text',
        'country_code' => '54',
        'document_photo_url' => 'url/to/photo.jpg',
        'address' => [
            'street' => '1234 Maple Street',
            'city' => 'Anytown',
            'state' => 'CA',
            'zip_code' => '90210',
            'country' => 'USA'
        ]
    ];

    $response = $this->postJson('/api/patients', $patientData);

    $response->assertStatus(422);

    $this->assertDatabaseMissing('patients', [
        'email' => 'john.doe@gmail.com'
    ]);

    $response->assertJsonValidationErrors(['name', 'email']);
}
}
