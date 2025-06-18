import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { NotificationType } from '../types/NotificationType';
import { BaseNotificationComponent } from '../components/base-notification-component/base-notification-component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  private show(type: NotificationType, message: string): void {
    const notificationRef = createComponent(BaseNotificationComponent, {
      environmentInjector: this.envInjector,
    });

    notificationRef.setInput('type', type);
    notificationRef.setInput('message', message);

    this.appRef.attachView(notificationRef.hostView);
    document.body.appendChild(notificationRef.location.nativeElement);

    setTimeout(() => {
      this.appRef.detachView(notificationRef.hostView);
      notificationRef.destroy();
    }, 3000);
  }
}
