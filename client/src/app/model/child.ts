import {HateoasResult} from './hateoas-result';
import {Gender} from './gender';
import {StudentLevel} from './student-level';
import {User} from './user';

export interface Child extends HateoasResult {
  firstname: string;
  lastname: string;
  gender: Gender;
  dob: Date;
  entryLevel: StudentLevel;
  currentLevel: StudentLevel;
  user: User;
}
