import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { IApiResponse } from '../interfaces/api-response.interface';
import { IEmployee } from '../interfaces/employee.interface';
import employeeList from '../../assets/data/employee-list.json';
import { IUser } from '../interfaces/user.interface';
import { EmployeeStatus } from '../enums/employee.status.enum';

export const apiMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const delayMs = 1000;
  const mockResponse = getMockData(req);

  if (mockResponse) {
    return of(new HttpResponse({ body: mockResponse })).pipe(delay(delayMs));
  }

  return next(req);
};

const getMockData = (req: HttpRequest<unknown>): IApiResponse<IEmployee | IEmployee[] | IUser> | null => {
  const urlParts = req.url.split('/');
  if (urlParts[2] === 'employees') {
    if (urlParts.length === 4) {
      const employeeDetails = employeeList.find(employee => employee.id === urlParts[3]);

      return { data: employeeDetails as IEmployee, code: 200 };
    }

    return { data: employeeList as IEmployee[], code: 200 };
  }

  if (urlParts[2] === 'users') {
    const data = req.body as IUser;
    data.employeeStatus = EmployeeStatus.OFFBOARDED;

    return { data, code: 200 };
  }

  return null;
};
