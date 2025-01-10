import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { IApiResponse } from '../interfaces/api-response.interface';
import { IEmployee } from '../interfaces/employee.interface';
import employeeList from '../../assets/data/employee-list.json';

export const apiMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const delayMs = 1000;
  const mockResponses: Record<string, IApiResponse<IEmployee | IEmployee[]>> = {
    '/api/employee': { data: employeeList as IEmployee[] },
  };
  const mockResponse = mockResponses[req.url];

  if (mockResponse) {
    return of(new HttpResponse({ body: mockResponse })).pipe(delay(delayMs));
  }

  return next(req);
};
