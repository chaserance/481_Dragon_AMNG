import {HateoasResult} from './hateoas-result';
import {Course} from './course';

export class Program extends HateoasResult {
  programName: string;
  programDescription: string;
  enabled: boolean;
  courses: Course[];
}
