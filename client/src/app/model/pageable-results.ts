import {HateoasResult} from './hateoas-result';

export class PageableResults<T> extends HateoasResult {
  _embedded: {
    result_array: T[]
  };
  page: {
    size: number,
    totalElement: number,
    totalPages: number,
    number: 0
  };
}
