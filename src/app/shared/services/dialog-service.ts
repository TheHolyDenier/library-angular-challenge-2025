import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { BaseDialogComponent } from '../components/base-dialog-component/base-dialog-component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = createComponent(BaseDialogComponent, {
        environmentInjector: this.envInjector,
      });

      dialogRef.setInput('title', title);
      dialogRef.setInput('message', message);

      dialogRef.instance.confirmed.subscribe((result: boolean) => {
        resolve(result);
        dialogRef.destroy();
      });

      this.appRef.attachView(dialogRef.hostView);
      document.body.appendChild(dialogRef.location.nativeElement);
    });
  }
}
