import { State } from './state';

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: State;
  zipCode: string;
}
