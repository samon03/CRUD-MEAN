import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
     console.log(this.employeeService.selectedEmployee.id);
     this.resetForm();
  }

  // tslint:disable-next-line: typedef
  resetForm(form?: NgForm)
  {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        id: '',
        name: '',
        position: '',
        office: '',
        salary: null
      };
    }

  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm)
  {
      this.employeeService.postEmployee(form.value)
        .subscribe((res) =>
        {
            this.resetForm(form);
            M.toast({ html: 'Saved succeesfully', classes: 'rounded' });
        });
  }

}
