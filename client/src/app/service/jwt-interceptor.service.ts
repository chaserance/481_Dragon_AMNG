import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    public auth: AuthService,
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('Test....');
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.auth.refresh();
        }
      }
    });
  }
}
