import { Component, inject, signal } from '@angular/core';
import { Navigation, Router } from '@angular/router';

import { IEmployee } from '../../../interfaces/employee.interface';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-employee-details',
  standalone: false,

  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _router: Router = inject(Router);

  public employee = signal<IEmployee | null>(null);

  constructor() {
    this._setEmployeeDetails(this._router.getCurrentNavigation());
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
}
