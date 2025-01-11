import { Component, computed, inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';

import { IEmployee } from '../../../interfaces/employee.interface';
import { ApiService } from '../../../services/api/api.service';
import { EmployeeTableService } from '../../../services/employee-table/employee-table.service';
import { EmployeeStatus } from '../../../enums/employee.status.enum';

@Component({
  selector: 'app-employee-details',
  standalone: false,

  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _employeeTableService: EmployeeTableService = inject(EmployeeTableService);
  private readonly _router: Router = inject(Router);

  public employee = signal<IEmployee | null>(null);
  public canOffboard = computed<boolean>(() => this._checkIfCanOffboard());

  constructor() {
    this._setEmployeeDetails(this._router.getCurrentNavigation());
  }

  public goToEmployeeList(): void {
    this._router.navigate(['/offboarding/list']);
  }

  public offboardEmployee(): void {
    const employeeList = this._employeeTableService.employeeList();

    if (employeeList) {
      this._updateEmployeeList(employeeList);
    }
  }

  private _setEmployeeDetails(currentNavigation: Navigation | null): void {
    const employeeId = currentNavigation?.extras.state?.['employeeId'] || null;
    if (!employeeId) {
      this._router.navigate(['/offboarding/list']);
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

  private _updateEmployeeList(employeeList: IEmployee[]): void {
    const employeeIndex = employeeList.findIndex((employee) => {
      return employee.id === this.employee()?.id;
    });

    if (employeeIndex > -1) {
      employeeList[employeeIndex].status = EmployeeStatus.OFFBOARDED;
      this._employeeTableService.employeeList.set([...employeeList]);
      this.goToEmployeeList();
    }
  }
}