import {HateoasResult} from './hateoas-result';
import {Privilege} from './privilege';

export interface Role extends HateoasResult {
  name: string;
  privileges: Privilege[];
}
