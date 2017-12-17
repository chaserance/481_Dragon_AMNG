import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Course} from '../../model/course';
import {Program} from '../../model/program';
import {Pageable} from '../../model/pageable';
import {EntityService} from './entity.service';

@Injectable()
export class CourseService extends EntityService<Course> {
  baseUrl = environment.baseUrl;

  private coursesUrl = this.baseUrl + '/api/courses?';

  /** GET ALL **/
  getCourses(pageable?: Pageable): Observable<PageableResults<Course>> {
    return this.http.get<PageableResults<Course>>(this.coursesUrl + (pageable ? pageable : ''))
      .pipe(
      );
  }

  /** GET ALL BY PROGRAM **/
  getCoursesByProgram(program: Program): Observable<PageableResults<Course>> {
    return this.http.get<PageableResults<Course>>(program._links.courses.href)
      .pipe(
      );
  }

  /** POST **/
  addCourse(course: Course, program?: Program): Observable<Course> {
    course.courseDescription = 'N/A';
    course.tuition = 0;
    course.enabled = course.enabled ? course.enabled : false;
    let rto = this.http.post<Course>(this.coursesUrl, course);
    if (program) {
      rto = rto.delayWhen(c => this.updateCourse(c, program._links.self.href));
    }
    return rto;
  }

  /** PUT **/
  updateCourse(course: Course, uri?: string): Observable<any> {
    let requestUri = course._links.self.href;
    let body: any = course;
    if (uri) {
      requestUri = course._links.program.href;
      body = uri;
    }
    return this.http.put<Course>(requestUri, body)
      .pipe(
      );
  }

  /** DELETE **/
  deleteCourse(course: Course): Observable<any> {
    return this.http.delete<Course>(course._links.self.href)
      .pipe(
      );
  }
}
