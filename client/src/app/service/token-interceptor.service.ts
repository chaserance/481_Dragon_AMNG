import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor( public auth: AuthService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let type = 'application/json';
    if (request.body && (typeof request.body === 'string')) {
      type = 'text/uri-list';
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
        'Content-Type': type,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next.handle(request);
  }

}
