import { Component, inject, signal } from '@angular/core';

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

  public employeeList = signal<IEmployee[]>([]);

  constructor() {
    this._setEmployeeList();
  }

  private _setEmployeeList(): void {
    this._apiService.getEmployeeList().subscribe(employees => {
      this.employeeList.set(employees);
    });
  }
}
