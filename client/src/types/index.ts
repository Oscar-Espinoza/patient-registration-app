export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PatientFields {
  name: string;
  email: string;
  address: Address | null;
  phoneNumber: string;
  countryCode: string;
  documentPhoto: File[] | null;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  address: string | null;
  email_verified_at: Date | null;
  phone_number: string;
  country_code: string;
  document_photo: string;
}