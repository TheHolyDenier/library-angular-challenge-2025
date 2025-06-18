import { Component, inject, input, OnInit, output } from '@angular/core';
import { IInputDefinition } from '../../interfaces/IInputDefinition';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFormModel } from '../../interfaces/IFormModel';

@Component({
  selector: 'app-base-form',
  imports: [ReactiveFormsModule],
  templateUrl: './base-form-component.html',
  styleUrl: './base-form-component.scss',
})
export class BaseFormComponent implements OnInit {
  form!: FormGroup;
  save = output<IFormModel>();
  inputs = input.required<IInputDefinition[]>();
  model = input<IFormModel>({});
  loading = input<boolean>(false);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    const group: Record<string, unknown> = {};

    this.inputs().forEach((input) => {
      group[input.name] = [
        this.model()[input.name] ?? '',
        input.validators ?? [],
      ];
    });

    this.form = this.formBuilder.group(group);
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as IFormModel);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
