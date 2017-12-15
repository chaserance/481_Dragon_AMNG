import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';

@Injectable()
export class EntityService<T> {

  constructor(protected http: HttpClient) { }

  getEntityByUrl(hash: string): Observable<T> {
    const uri = this.decodeHash(hash);
    return this.http.get<T>(uri)
      .pipe();
  }

  getEntitiesByUrl(hash: string): Observable<PageableResults<T>> {
    const uri = this.decodeHash(hash);
    return this.http.get<PageableResults<T>>(uri)
      .pipe();
  }

  private decodeHash(hash: string): string {
    return window.atob(hash);
  }
}
