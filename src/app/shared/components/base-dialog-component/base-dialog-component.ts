import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  imports: [],
  templateUrl: './base-dialog-component.html',
  styleUrl: './base-dialog-component.scss',
})
export class BaseDialogComponent {
  title = input.required<string>();
  message = input.required<string>();
  confirmed = output<boolean>();

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.confirmed.emit(false);
  }
}
