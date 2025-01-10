import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { IApiResponse } from '../interfaces/api-response.interface';
import { IEmployee } from '../interfaces/employee.interface';
import employeeList from '../../assets/data/employee-list.json';

export const apiMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const delayMs = 1000;
  const mockResponse = getMockData(req.url);

  if (mockResponse) {
    return of(new HttpResponse({ body: mockResponse })).pipe(delay(delayMs));
  }

  return next(req);
};

const getMockData = (url: string): IApiResponse<IEmployee | IEmployee[]> | null => {
  const urlParts = url.split('/');
  if (urlParts[2] === 'employees') {
    if (urlParts.length === 4) {
      const employeeDetails = employeeList.find(employee => employee.id === urlParts[3]);

      return { data: employeeDetails as IEmployee };
    }

    return { data: employeeList as IEmployee[] };
  }

  return null;
};
