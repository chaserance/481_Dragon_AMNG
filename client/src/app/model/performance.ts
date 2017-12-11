import {HateoasResult} from './hateoas-result';

export class Performance extends HateoasResult {
  feedBack: string;
  grade: string;
  sessionUri: string;
  childUri: string;
}
