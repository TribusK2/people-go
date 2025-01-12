import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IEmployee } from '../../interfaces/employee.interface';
import { IApiResponse } from '../../interfaces/api-response.interface';
import { IOffboardData } from '../../interfaces/offboard-data.interface';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _httpClient = inject(HttpClient);

  public getEmployeeList(): Observable<IEmployee[]> {
    return this._httpClient.get<IApiResponse<IEmployee[]>>('/api/employees').pipe(
      map(res => res.data)
    );
  }

  public getEmployeeDetails(employeeId: string): Observable<IEmployee> {
    return this._httpClient.get<IApiResponse<IEmployee>>(`/api/employees/${employeeId}`).pipe(
      map(res => res.data)
    );
  }

  public offboardUser(userId: string, offboardData: IOffboardData): Observable<IUser> {
    return this._httpClient.put<IApiResponse<IUser>>(`/api/users/${userId}/offboard`, offboardData).pipe(
      map(res => res.data)
    );
  }
}
