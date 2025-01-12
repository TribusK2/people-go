import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IEmployee } from '../../interfaces/employee.interface';
import { IApiResponse } from '../../interfaces/api-response.interface';
import { IOffboardData } from '../../interfaces/offboard-data.interface';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _snackBar = inject(MatSnackBar);

  public getEmployeeList(): Observable<IEmployee[]> {
    return this._httpClient.get<IApiResponse<IEmployee[]>>('/api/employees').pipe(
      map(res => this._handleResponse(res))
    );
  }

  public getEmployeeDetails(employeeId: string): Observable<IEmployee> {
    return this._httpClient.get<IApiResponse<IEmployee>>(`/api/employees/${employeeId}`).pipe(
      map(res => this._handleResponse(res))
    );
  }

  public offboardUser(userId: string, offboardData: IOffboardData): Observable<IUser> {
    return this._httpClient.put<IApiResponse<IUser>>(`/api/users/${userId}/offboard`, offboardData).pipe(
      map(res => this._handleResponse(res))
    );
  }

  private _handleResponse<T>(res: IApiResponse<T>): T {
    if (res.code !== 200) {
      this._snackBar.open('Some error occured!', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      throw new Error(res.error);
    }

    return res.data;
  }
}
