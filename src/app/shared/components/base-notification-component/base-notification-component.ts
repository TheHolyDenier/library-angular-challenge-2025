import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NotificationType } from '../../types/NotificationType';

@Component({
  selector: 'app-base-notification',
  imports: [NgClass],
  templateUrl: './base-notification-component.html',
  styleUrl: './base-notification-component.scss',
})
export class BaseNotificationComponent {
  type = input.required<NotificationType>();
  message = input.required<string>();
}
