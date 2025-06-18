import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  error(message: string, ...optionalParams: unknown[]): void {
    if (environment.production) return;
    console.error(message, ...optionalParams);
  }
}
