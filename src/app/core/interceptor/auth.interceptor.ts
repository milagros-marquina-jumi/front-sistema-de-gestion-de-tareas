import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  let authReq = request;

  if (token) {
    const cloned = authReq.clone({
      headers: authReq.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(cloned).pipe(
    catchError((error) => {
     // console.log('Error en la solicitud: ', error);

      if (error.status === 401) {
        authService.removerAuth();
        router.navigate(['login']);
      }

      return throwError(() => error);
    }));
  }
  return next(authReq);
};
