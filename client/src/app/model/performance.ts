import {HateoasResult} from './hateoas-result';
import {Child} from './child';
import {Session} from './session';

export class Performance extends HateoasResult {
  feedBack: string;
  grade: string;
  sessionUri: string;
  childUri: string;
  child: Child;
  session: Session;
}
