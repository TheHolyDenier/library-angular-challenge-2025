import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { LoggerService } from '../services/logger-service';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        { provide: LoggerService, useValue: loggerServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it('should pass the request if no error occurs', (done) => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: () => of({ type: 0 } as HttpEvent<unknown>),
    };

    interceptor.intercept(request, next).subscribe({
      next: (event) => {
        expect(event).toBeTruthy();
        done();
      },
      error: () => {
        fail('Should not emit error');
        done();
      },
    });
  });

  it('should handle HttpErrorResponse, log error and navigate', (done) => {
    const request = new HttpRequest('GET', '/test-url');
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: '/test-url',
      error: { message: 'Not Found' },
    });

    const next: HttpHandler = {
      handle: () => throwError(() => errorResponse),
    };

    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    interceptor.intercept(request, next).subscribe({
      next: () => fail('Should error'),
      error: (error) => {
        expect(error).toBe(errorResponse);

        expect(loggerServiceSpy.error).toHaveBeenCalled();
        const loggedMsg = loggerServiceSpy.error.calls.mostRecent().args[0];
        expect(loggedMsg).toContain('/test-url');
        expect(loggedMsg).toContain('404');

        expect(routerSpy.navigate).toHaveBeenCalledWith(
          ['/404'],
          jasmine.any(Object),
        );

        done();
      },
    });
  });
});
