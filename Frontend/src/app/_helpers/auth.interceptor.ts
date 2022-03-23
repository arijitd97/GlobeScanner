import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';
// const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-access-token';
@Injectable()
// export class AuthInterceptor implements HttpInterceptor {
  export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    let authReq = req;
    const token = this.token.getToken();
    // if (token != null) {
    //   authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    // }
    if (token != null) {
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      // console.log(token);
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    // console.log(authReq);
    
    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];