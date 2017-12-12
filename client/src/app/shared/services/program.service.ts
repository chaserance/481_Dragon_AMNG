import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Program} from '../../model/program';
import {tap} from 'rxjs/operators';
import {PageableResults} from '../../model/pageable-results';
import {Pageable} from '../../model/pageable';

@Injectable()
export class ProgramService {
  baseUrl = environment.baseUrl;

  private programsUrl = this.baseUrl + '/api/programs/';

  constructor(private http: HttpClient) { }

  /** GET ALL **/
  getPrograms(pageable?: Pageable): Observable<PageableResults<Program>> {
    return this.http.get<PageableResults<Program>>(this.programsUrl + (pageable ? pageable : ''))
      .pipe(
      );
  }

  /** POST **/
  addProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.programsUrl, program)
      .pipe(
      );
  }

  /** PUT **/
  updateProgram(program: Program, uri?: string): Observable<any> {
    const requestUri = program._links.self.href;
    const body: any = program;
    return this.http.put(requestUri, body)
      .pipe(
      );
  }

  /** DELETE **/
  deleteProgram(program: Program): Observable<any> {
    return this.http.delete<Program>(program._links.self.href)
      .pipe(
      );
  }
}
