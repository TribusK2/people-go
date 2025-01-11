import { TestBed } from '@angular/core/testing';

import { EmployeeTableService } from './employee-table.service';

describe('EmployeeTableService', () => {
  let service: EmployeeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
