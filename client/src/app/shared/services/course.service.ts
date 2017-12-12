import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Course} from '../../model/course';
import {tap} from 'rxjs/operators';
import {Program} from '../../model/program';
import {Pageable} from '../../model/pageable';

@Injectable()
export class CourseService {
  baseUrl = environment.baseUrl;

  private coursesUrl = this.baseUrl + '/api/courses/';

  constructor(private http: HttpClient) { }

  /** GET ALL **/
  getCourses(pageable: Pageable): Observable<PageableResults<Course>> {
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
    return this.http.post<Course>(this.coursesUrl, course)
      .pipe(
        tap(_ => {
          if (program) {
            this.updateCourse(course, program._links.self.href);
          }
        }),
      );
  }

  /** PUT **/
  updateCourse(course: Course, uri?: string): Observable<any> {
    let requestUri = course._links.self.href;
    let body: any = course;
    if (uri) {
      requestUri = course._links.program.href;
      body = uri;
    }
    return this.http.put(requestUri, body)
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
