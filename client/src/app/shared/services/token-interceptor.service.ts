import {Injectable, Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let type = 'application/json';
    if (request.body && (typeof request.body === 'string')) {
      type = 'text/uri-list';
    }
    const auth = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
        'Content-Type': type,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next.handle(request);
  }

}
