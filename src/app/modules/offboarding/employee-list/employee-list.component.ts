import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../services/api/api.service';
import { IEmployee } from '../../../interfaces/employee.interface';
import { EmployeeTableService } from '../../../services/employee-table/employee-table.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _employeeTableService: EmployeeTableService = inject(EmployeeTableService);
  private readonly _router: Router = inject(Router);

  constructor() {
    this._setEmployeeList();
  }

  public goToEmployeeDetails(employee: IEmployee): void {
    this._router.navigate(['/offboarding/details'], { state: { employeeId: employee.id } });
  }

  private _setEmployeeList(): void {
    this._apiService.getEmployeeList().subscribe(employees => {
      this._employeeTableService.employeeList.set(employees);
    });
  }
}
