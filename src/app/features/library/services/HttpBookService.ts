import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBook } from '../interfaces/IBook';
import { IFindMany } from '../../../shared/interfaces/IFindMany';
import { IFormModel } from '../../../shared/interfaces/IFormModel';

@Injectable({
  providedIn: 'root',
})
export class HttpBookService {
  private apiUrl = '/api/books';
  private http = inject(HttpClient);

  getMany(page = 1, pageSize = 10): Observable<IFindMany<IBook>> {
    return this.http.get<IBook[]>(this.apiUrl).pipe(
      map(function (data) {
        const firstElementIndex = (page - 1) * pageSize;
        const paginatedData = data.slice(
          firstElementIndex,
          firstElementIndex + pageSize,
        );
        return {
          data: paginatedData,
          total: data.length,
          page: page,
        };
      }),
    );
  }

  create(model: IFormModel): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl, model);
  }

  getOne(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/${id}`);
  }

  update(id: number, model: IFormModel): Observable<IBook> {
    return this.http.put<IBook>(`${this.apiUrl}/${id}`, { ...model, id });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
