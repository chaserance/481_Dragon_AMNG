import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';

@Injectable()
export class EntityService<T> {

  constructor(protected http: HttpClient) { }

  getEntityByUrl(uri: string, isPlain?: boolean): Observable<T> {
    if (!isPlain) {
      uri = this.decodeHash(uri);
    }
    return this.http.get<T>(uri)
      .pipe();
  }

  getEntitiesByUrl(uri: string, isPlain?: boolean): Observable<PageableResults<T>> {
    if (!isPlain) {
      uri = this.decodeHash(uri);
    }
    return this.http.get<PageableResults<T>>(uri)
      .pipe();
  }

  private decodeHash(hash: string): string {
    return window.atob(hash);
  }
}
