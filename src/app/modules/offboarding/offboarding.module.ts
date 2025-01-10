import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffboardingRoutingModule } from './offboarding-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    OffboardingRoutingModule,
  ],
})
export class OffboardingModule { }
