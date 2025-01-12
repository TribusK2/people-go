import { EmployeeStatus } from '../enums/employee.status.enum';

export interface IUser {
  address: string;
  city: string;
  code: string;
  country: string
  email: string;
  employeeStatus: EmployeeStatus;
  notes: string;
  phone: string;
  receiver: string;
}