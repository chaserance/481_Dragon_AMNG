import {Address} from './address';
import {Authority} from './authority';

export interface User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
  lastPasswordResetDate: Date;
  registrationDate: Date;
  address: Address;
  phoneNumber: string;
  roles: Array<Authority>;
}
