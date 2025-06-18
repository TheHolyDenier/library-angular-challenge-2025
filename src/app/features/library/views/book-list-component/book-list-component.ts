import { Component, inject, signal } from '@angular/core';
import { BaseTableComponent } from '../../../../shared/components/base-table-component/base-table-component';
import { IColumn } from '../../../../shared/interfaces/IColumn';
import { IBook } from '../../interfaces/IBook';
import { HttpBookService } from '../../services/HttpBookService';
import { Observable } from 'rxjs';
import { IFindMany } from '../../../../shared/interfaces/IFindMany';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../../../shared/services/dialog-service';
import { NotificationService } from '../../../../shared/services/notification-service';

@Component({
  selector: 'app-book-list-component',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.scss',
})
export class BookListComponent {
  protected columns: IColumn<IBook>[] = [
    {
      name: 'title',
      label: 'Title',
      value: (book) => book.title,
    },
    {
      name: 'author',
      label: 'Author',
      value: (book) => book.author,
    },
    {
      name: 'year',
      label: 'Year',
      value: (book) => String(book.year),
    },
    { name: 'genre', label: 'Genre', value: (book) => book.genre },
  ];
  protected isDeleting = signal<boolean>(false);
  private dialogService = inject(DialogService);
  private bookService = inject(HttpBookService);
  protected books$: Observable<IFindMany<IBook>> = this.bookService.getMany();
  private notificationService = inject(NotificationService);

  async deleteBook(book: IBook) {
    if (this.isDeleting()) return;

    const confirmed = await this.dialogService.confirm(
      'Delete Book',
      `Are you sure you want to delete "${book.title}"?`,
    );

    if (confirmed) {
      this.isDeleting.set(true);
      this.bookService.remove(book.id).subscribe({
        next: () => {
          this.books$ = this.bookService.getMany();
          this.notificationService.success('Book deleted successfully!');
        },
        complete: () => {
          this.isDeleting.set(false);
        },
      });
    }
  }
}
