import { GENRE_TYPES } from '../../types/GenreType';
import { IInputDefinition } from '../../../../shared/interfaces/IInputDefinition';
import { Validators } from '@angular/forms';

export const bookInputDefinitions: IInputDefinition[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    validators: [Validators.required],
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    validators: [Validators.required],
  },
  {
    name: 'year',
    label: 'Year',
    type: 'number',
    validators: [Validators.required, Validators.min(0)],
  },
  {
    name: 'genre',
    label: 'Genre',
    type: 'select',
    options: GENRE_TYPES.map((value) => ({ label: value, value })),
    validators: [Validators.required],
  },
];
