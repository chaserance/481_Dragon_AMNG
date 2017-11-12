import { Address } from './address';

export interface LoginRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: Address;
  phoneNumber: string;
}
