import { EmployeeStatus } from '../enums/employee.status.enum';
import { IEquipment } from './equipment.interface';

export interface IEmployee {
  department: string,
  email: string,
  equipments: IEquipment[]
  id: string;
  name: string;
  status: EmployeeStatus,
}