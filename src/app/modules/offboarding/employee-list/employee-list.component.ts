import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../services/api/api.service';
import { IEmployee } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _router: Router = inject(Router);

  public employeeList = signal<IEmployee[]>([]);

  constructor() {
    this._setEmployeeList();
  }

  public goToEmployeeDetails(employeeId: string): void {
    this._router.navigate(['/offboarding/details'], { state: { employeeId } });
  }

  private _setEmployeeList(): void {
    this._apiService.getEmployeeList().subscribe(employees => {
      this.employeeList.set(employees);
    });
  }
}
