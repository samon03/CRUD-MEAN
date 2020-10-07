import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employee: Employee[];
  readonly baseURL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  postEmployee(emp: Employee){
    return this.http.post(this.baseURL, emp);
  }
}
