import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    // Get the auth token
    //const token = this.authService.getToken();
    let authService = inject(AuthService);
    const token = authService.getToken();
    
    // Clone the request and add the authorization header if token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and catch any authentication errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // If we get a 401 Unauthorized response, log the user out
        if (error.status === 401) {
          authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
    const token = inject(AuthService).getToken();
    
    // Clone the request and add the authorization header if token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next(request).pipe(catchError(error => {
      // If we get a 401 Unauthorized response, log the user out
      if (error.status === 401) {
        inject(AuthService).logout();
      }
      return throwError(() => error);
    }))
}