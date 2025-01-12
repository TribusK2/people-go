import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IOffboardData } from '../../interfaces/offboard-data.interface';

@Component({
  selector: 'app-offboard-form',
  standalone: true,
  templateUrl: './offboard-form.component.html',
  styleUrl: './offboard-form.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class OffboardFormComponent {
  @Output() public formValidationChange = new EventEmitter<boolean>();
  @Output() public formValueChange = new EventEmitter<IOffboardData>();

  private readonly _formBuilder = inject(FormBuilder);

  public employeeDataForm = signal(this._initEmployeeForm());

  constructor() {
    this._listenOnFormValueChange();
  }

  private _initEmployeeForm(): FormGroup {
    return this._formBuilder.group({
      receiver: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(300)]],
      city: ['', [Validators.required, Validators.maxLength(80)]],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.maxLength(80)]],
      notes: ['', [Validators.maxLength(2000)]],
    });
  }

  public getError(controlName: string): string {
    let errorMessage = '';
    const errors = this.employeeDataForm().get(controlName)?.errors;

    if (errors) {
      if (errors['required']) {
        errorMessage = 'This filed is required';
      }

      if (errors['email']) {
        errorMessage = 'Please enter a valid email address';
      }

      if (errors['maxlength']) {
        errorMessage = `Maximum number of characters is ${errors['maxlength'].requiredLength}`;
      }
    }

    return errorMessage;
  }

  private _listenOnFormValueChange(): void {
    this.employeeDataForm().valueChanges.pipe(
      tap((value: IOffboardData) => this.formValueChange.emit(value)),
      filter(() => this.employeeDataForm().touched),
      map(() => {
        return this.employeeDataForm().valid;
      }),
      distinctUntilChanged(),
      tap((isValid) => this.formValidationChange.emit(isValid)),
      takeUntilDestroyed()
    ).subscribe();
  }
}
