import {HateoasResult} from './hateoas-result';
import {Course} from './course';

export interface Program extends HateoasResult {
  programName: string;
  programDescription: string;
  enabled: boolean;
  courses: Course[];
}
