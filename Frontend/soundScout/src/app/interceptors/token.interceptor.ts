import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem("token")) {
      //whyyy.....
      var token: any = localStorage.getItem("token");
      const authHeader = request.clone({
        headers: request.headers.set("X-AUTH-HEADER", token)
      })
      request = authHeader;
    }

    return next.handle(request);
  }
}
