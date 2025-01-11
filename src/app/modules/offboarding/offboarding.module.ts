import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { OffboardingRoutingModule } from './offboarding-routing.module';
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
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    OffboardingRoutingModule,
  ],
})
export class OffboardingModule { }
