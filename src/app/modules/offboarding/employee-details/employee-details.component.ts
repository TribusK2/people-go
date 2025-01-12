import { Component, computed, inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';

import { IEmployee } from '../../../interfaces/employee.interface';
import { ApiService } from '../../../services/api/api.service';
import { EmployeeTableService } from '../../../services/employee-table/employee-table.service';
import { EmployeeStatus } from '../../../enums/employee.status.enum';
import { OffboardDialogComponent } from '../../../components/offboard-dialog/offboard-dialog.component';
import { IOffboardData } from '../../../interfaces/offboard-data.interface';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  private readonly _apiService = inject(ApiService);
  private readonly _employeeTableService = inject(EmployeeTableService);
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);

  public employee = signal<IEmployee | null>(null);
  public canOffboard = computed<boolean>(() => this._checkIfCanOffboard());

  constructor() {
    this._setEmployeeDetails(this._router.getCurrentNavigation());
  }

  public goToEmployeeList(): void {
    this._router.navigate(['/offboarding/list']);
  }

  public offboardEmployee(): void {
    const dialogRef = this._dialog.open<OffboardDialogComponent, IEmployee, IOffboardData>(OffboardDialogComponent, {
      data: this.employee(),
    });

    dialogRef.afterClosed().pipe(
      switchMap((offboardData) => this._offboardUser(offboardData)),
      tap((userData) => this._updateEmployeeList(userData, this._employeeTableService.employeeList()))
    ).subscribe();
  }

  private _setEmployeeDetails(currentNavigation: Navigation | null): void {
    const employeeId = currentNavigation?.extras.state?.['employeeId'] || null;
    if (!employeeId) {
      this.goToEmployeeList();
    } else {
      this._apiService.getEmployeeDetails(employeeId).subscribe(employee => {
        this.employee.set(employee);
      });
    }
  }

  private _checkIfCanOffboard(): boolean {
    const employee = this.employee();
    const employeeList = this._employeeTableService.employeeList();

    return !!employeeList && !!employee && employee.status !== EmployeeStatus.OFFBOARDED;
  }

  private _offboardUser(offboardData: IOffboardData | undefined): Observable<IUser> {
    const employeeId = this.employee()?.id;

    if (employeeId && offboardData) {
      return this._apiService.offboardUser(employeeId, offboardData);
    }

    return EMPTY;
  }

  private _updateEmployeeList(userData: IUser, employeeList: IEmployee[] | null): void {
    if (userData) {
      const employeeToUpdate = employeeList?.find((employee) => {
        return employee.id === this.employee()?.id;
      });

      if (employeeToUpdate) {
        employeeToUpdate.status = EmployeeStatus.OFFBOARDED;
        this._employeeTableService.updateEmployee(employeeToUpdate);
        this.goToEmployeeList();
      }
    }
  }
}