import { importProvidersFrom } from '@angular/core';
import { NotificationService } from '../shared/services/notification-service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryBookService } from '../features/library/services/InMemoryBookService';
import { TheLayout } from '../layout/the-layout/the-layout';
import { LoggerService } from './services/logger-service';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';

export const provideCore = () => [
  provideHttpClient(withInterceptorsFromDi()),
  environment.production
    ? []
    : importProvidersFrom(
        HttpClientInMemoryWebApiModule.forRoot(InMemoryBookService),
      ),
  TheLayout,
  NotificationService,
  LoggerService,
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
