import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormComponent } from './base-form-component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('BaseForm', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('inputs', [
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
    ]);

    fixture.detectChanges();
  });

  it('should create the form with the defined inputs', () => {
    expect(component).toBeTruthy();

    const titleControl = component.form.get('title');
    const authorControl = component.form.get('author');

    expect(titleControl).toBeTruthy();
    expect(authorControl).toBeTruthy();
    expect(titleControl?.value).toBe('');
    expect(authorControl?.value).toBe('');
  });

  it('should display validation errors when the form is invalid and touched', () => {
    const titleInput = fixture.debugElement.query(By.css('input[id="title"]'));
    const titleErrorDiv = fixture.debugElement.query(
      By.css('#title ~ .form__error'),
    );

    expect(titleErrorDiv).toBeNull();

    titleInput.triggerEventHandler('blur', null);
    fixture.detectChanges();

    const titleErrorAfterBlur = fixture.debugElement.query(
      By.css('#title ~ .form__error'),
    );
    expect(titleErrorAfterBlur).toBeTruthy();
    expect(titleErrorAfterBlur.nativeElement.textContent).toContain(
      'Title is required.',
    );
  });

  it('should emit save event with form data on valid submit', () => {
    spyOn(component.save, 'emit');

    component.form.get('title')?.setValue('It');
    component.form.get('author')?.setValue('Stephen King');

    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('submit', null);

    expect(component.save.emit).toHaveBeenCalledWith({
      title: 'It',
      author: 'Stephen King',
    });
  });

  it('should disable the submit button if form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(component.form.invalid).toBeTrue();
    expect(button.nativeElement.disabled).toBeTrue();

    component.form.get('title')?.setValue('');
    component.form.get('author')?.setValue('');
    fixture.detectChanges();

    expect(component.form.valid).toBeFalse();
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should enable the submit button if form is valid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(component.form.invalid).toBeTrue();
    expect(button.nativeElement.disabled).toBeTrue();

    component.form.get('title')?.setValue('It');
    component.form.get('author')?.setValue('Stephen King');
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(button.nativeElement.disabled).toBeFalse();
  });
});
