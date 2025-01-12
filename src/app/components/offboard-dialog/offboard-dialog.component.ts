import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { OffboardFormComponent } from '../offboard-form/offboard-form.component';
import { IEmployee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-offboard-dialog',
  standalone: true,
  templateUrl: './offboard-dialog.component.html',
  styleUrl: './offboard-dialog.component.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    OffboardFormComponent,
  ],
})
export class OffboardDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<OffboardDialogComponent>);
  private readonly _employee = inject<IEmployee>(MAT_DIALOG_DATA);
  public readonly employeeId = model(this._employee.id);

  public onCancel(): void {
    this._dialogRef.close();
  }
}
