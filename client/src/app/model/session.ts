import {HateoasResult} from './hateoas-result';
import {DatePeriod} from './date-period';
import {Schedule} from './schedule';
import {User} from './user';
import {Course} from './course';

export class Session extends HateoasResult {
  sessionName: string;
  sessionDescription: string;
  period: DatePeriod;
  schedule: Schedule;

  teacher: User;
  course: Course;
}
