import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpBookService } from '../services/HttpBookService';
import { IBook } from '../interfaces/IBook';

@Injectable({
  providedIn: 'root',
})
export class BookResolver implements Resolve<IBook | null> {
  private bookService = inject(HttpBookService);

  resolve(route: ActivatedRouteSnapshot): Observable<IBook | null> {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id)) {
      throw new Error('Book id must be a number');
    }
    return this.bookService.getOne(id);
  }
}
