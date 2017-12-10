import { Address } from './address';

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: Address;
  phoneNumber: string;
}
