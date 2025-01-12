import { Injectable, signal } from '@angular/core';
import { IEmployee } from '../../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeTableService {
  public employeeList = signal<IEmployee[] | null>(null);

  public updateEmployee(employeeToUpdate: IEmployee): void {
    const employeeList = this.employeeList();
    
    if (employeeList) {
      const employeeIndex = employeeList.findIndex((employee) => {
        return employee.id === employeeToUpdate.id;
      });

      if (employeeIndex > -1) {
        employeeList[employeeIndex] = employeeToUpdate;
        this.employeeList.set([...employeeList]);
      }
    }
  }
}
