import { Component, effect, input, signal, TemplateRef } from '@angular/core';
import { IColumn } from '../../interfaces/IColumn';
import { IBaseModel } from '../../interfaces/IBaseModel';
import { IFindMany } from '../../interfaces/IFindMany';
import { Observable } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-base-table',
  imports: [NgTemplateOutlet],
  templateUrl: './base-table-component.html',
  styleUrl: './base-table-component.scss',
})
export class BaseTableComponent<T extends IBaseModel = IBaseModel> {
  columns = input<IColumn<T>[]>([]);
  dataLoader$ = input.required<Observable<IFindMany<T>>>();
  actionTemplate = input<TemplateRef<{ $implicit: T }>>();
  loading = signal(true);
  result = signal<IFindMany<T> | null>(null);
  pageSize = signal<number>(10);
  page = signal<number>(1);
  protected readonly Math = Math;

  constructor() {
    effect(() => {
      this.loading.set(true);

      return this.dataLoader$().subscribe((data) => {
        this.result.set(data);
        this.loading.set(false);
      });
    });
  }

  goToPage(page: number) {
    this.page.set(page);
  }
}
