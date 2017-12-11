import { Address } from './address';

export class RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: Address;
  phoneNumber: string;
}
