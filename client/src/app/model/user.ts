import {Address} from './address';
import {HateoasResult} from './hateoas-result';

export class User extends HateoasResult {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
  lastPasswordResetDate: Date;
  registrationDate: Date;
  address: Address;
  phoneNumber: string;
}
