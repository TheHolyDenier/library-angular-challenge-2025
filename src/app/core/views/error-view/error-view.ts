import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IHttpError } from '../../../shared/interfaces/IHttpError';

@Component({
  selector: 'app-error-view',
  imports: [],
  templateUrl: './error-view.html',
  styleUrl: './error-view.scss',
})
export class ErrorView {
  router = inject(Router);
  error = signal<IHttpError | null>(null);

  constructor() {
    const nav = this.router.getCurrentNavigation();
    this.error.set(nav?.extras.state?.['error']);
  }

  goHome() {
    this.router.navigate(['/library']);
  }
}
