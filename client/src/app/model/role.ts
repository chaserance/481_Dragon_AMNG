import {HateoasResult} from './hateoas-result';
import {Privilege} from './privilege';

export class Role extends HateoasResult {
  name: string;
  privileges: Privilege[];
}
