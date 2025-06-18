import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IBook } from '../interfaces/IBook';

@Injectable({ providedIn: 'root' })
export class InMemoryBookService implements InMemoryDbService {
  createDb() {
    const books: IBook[] = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'dystopian',
      },
      {
        id: 2,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        year: 1937,
        genre: 'fantasy',
      },
    ];
    return { books };
  }
}
