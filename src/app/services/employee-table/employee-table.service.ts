import { Injectable, signal } from '@angular/core';
import { IEmployee } from '../../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeTableService {
  public employeeList = signal<IEmployee[]>([]);
}
