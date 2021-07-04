import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem("adminToken")) {
      var token: any = localStorage.getItem("adminToken");
      const authHeader = request.clone({
        headers: request.headers.append("X-AUTH-HEADER", token)
      })
      request = authHeader;
    }

    return next.handle(request);
  }
}
