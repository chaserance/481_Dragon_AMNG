import {HateoasResult} from './hateoas-result';

export interface Promotion extends HateoasResult {
  name: string;
  description: string;
  ratio: number;
}
