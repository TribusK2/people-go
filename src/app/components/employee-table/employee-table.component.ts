import { Component, computed, EventEmitter, inject, Output, signal, Signal, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IEmployee } from '../../interfaces/employee.interface';
import { EmployeeTableService } from '../../services/employee-table/employee-table.service';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatTableModule, 
  ],
})
export class EmployeeTableComponent {
  private readonly _employeeTableService = inject(EmployeeTableService);

  @Output() public recordSelect = new EventEmitter<IEmployee>();

  public displayedColumns = ['fullname', 'email', 'department', 'equipment', 'status'];
  public dataSource: Signal<MatTableDataSource<IEmployee> | null> = computed(() => this._setDataSource());
  private _dataSourceFilter: WritableSignal<string> = signal('');

  public onRecordSelect(employee: IEmployee): void {
    this.recordSelect.emit(employee);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSourceFilter.set(filterValue.trim().toLowerCase());
  }

  private _setDataSource(): MatTableDataSource<IEmployee> | null {
    let dataSource: MatTableDataSource<IEmployee> | null = null;
    const employeeList = this._employeeTableService.employeeList();

    if (employeeList) {
      dataSource = new MatTableDataSource(employeeList);
      dataSource.filter = this._dataSourceFilter();
    }

    return dataSource;
  }
}
