import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoggerService } from '../services/logger-service';
import { IHttpError } from '../../shared/interfaces/IHttpError';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  loggerService = inject(LoggerService);
  router = inject(Router);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const httpError = this.getError(error);
        this.loggerService.error(
          `[HTTP ERROR] 🚨 \n➤ URL: ${req?.url ?? 'N/A'}\n➤ Message: ${httpError.message ?? 'No message'}\n➤ Method: ${req?.method ?? 'N/A'}\n➤ Date: ${new Date().toLocaleString()}`,
        );
        this.router
          .navigate([httpError.status ? `/${httpError.status}` : '/error'], {
            state: { error: httpError },
          })
          .catch((navError) =>
            this.loggerService.error('Navigation failed', navError),
          );
        return throwError(() => error);
      }),
    );
  }

  private getError(error: HttpErrorResponse): IHttpError {
    return {
      status: error?.status ?? null,
      statusText: error?.statusText ?? null,
      message: error?.message ?? error.error?.message,
    };
  }
}
