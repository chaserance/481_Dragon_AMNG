import {HateoasResult} from './hateoas-result';
import {DatePeriod} from './date-period';
import {User} from './user';
import {Promotion} from './promotion';

export class Bill extends HateoasResult {
  amount: number;
  discount: number;
  billPeriod: DatePeriod;
  user: User;
  promotion: Promotion;
}
