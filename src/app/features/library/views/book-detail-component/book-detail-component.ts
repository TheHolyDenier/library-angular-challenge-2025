import { Component, inject, signal } from '@angular/core';
import { bookToFormModel, IBook } from '../../interfaces/IBook';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseFormComponent } from '../../../../shared/components/base-form-component/base-form-component';
import { bookInputDefinitions } from './book.input-definitions';
import { IFormModel } from '../../../../shared/interfaces/IFormModel';
import { HttpBookService } from '../../services/HttpBookService';
import { NotificationService } from '../../../../shared/services/notification-service';

@Component({
  selector: 'app-book-detail-component',
  imports: [RouterLink, BaseFormComponent],
  templateUrl: './book-detail-component.html',
  styleUrl: './book-detail-component.scss',
})
export class BookDetailComponent {
  protected book = signal<IBook | null>(null);
  protected isLoading = signal<boolean>(false);
  protected readonly bookInputDefinitions = bookInputDefinitions;
  protected readonly bookToFormModel = bookToFormModel;
  private route = inject(ActivatedRoute);
  private bookService = inject(HttpBookService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  constructor() {
    this.route.data.subscribe((data) => {
      this.isLoading.set(true);
      const book = data['book'] as IBook;
      if (book) {
        this.book.set(book);
      }
      this.isLoading.set(false);
    });
  }

  protected submit(model: IFormModel) {
    if (this.isLoading()) return;
    if (this.book()) {
      this.update(model);
    } else {
      this.create(model);
    }
  }

  private create(createBook: IFormModel) {
    this.isLoading.set(true);
    this.bookService.create(createBook).subscribe({
      next: (result) => {
        this.notificationService.success('Book created!');
        this.router.navigate(['/library', result.id]);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private update(updateBook: IFormModel) {
    this.isLoading.set(true);
    this.bookService.update(this.book()!.id, { ...updateBook }).subscribe({
      next: () => {
        this.book.set({ ...this.book()!, ...updateBook });
        this.notificationService.success('Book updated!');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
