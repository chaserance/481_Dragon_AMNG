import {HateoasResult} from './hateoas-result';
import {Program} from './program';
import {Session} from './session';

export class Course extends HateoasResult {
  courseName: string;
  courseDescription: string;
  enabled: boolean;
  tuition: number;
  program: Program;
  sessions: Session[];
}
