import { ValidatorFn } from '@angular/forms';
import { ISelectOption } from './ISelectOption';

export interface IInputDefinition {
  name: string;
  label: string;
  type: string;
  validators?: ValidatorFn[];
  options?: ISelectOption[];
}
