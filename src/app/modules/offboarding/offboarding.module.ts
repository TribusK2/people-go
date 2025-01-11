import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { OffboardingRoutingModule } from './offboarding-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';

@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    EmployeeTableComponent,
    MatTabsModule,
    OffboardingRoutingModule,
  ],
})
export class OffboardingModule { }
