import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'console';
import { Employee } from '../shared/employee.model';

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
     this.resetForm();
     this.refreshEmployeeList();
  }

  // tslint:disable-next-line: typedef
  resetForm(form?: NgForm)
  {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: '',
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
    // tslint:disable-next-line: triple-equals
    if (form.value._id == '')
    {
      console.log(form.value._id);

      this.employeeService.postEmployee(form.value)
      .subscribe((res) =>
      {
          this.resetForm(form);
          this.refreshEmployeeList();
          M.toast({ html: 'Saved succeesfully', classes: 'rounded' });
      });
    }
    else
    {
      this.employeeService.putEmployee(form.value)
      .subscribe((res) =>
      {
          this.resetForm(form);
          this.refreshEmployeeList();
          M.toast({ html: 'Updated succeesfully', classes: 'rounded' });
      });
    }
  }

   // tslint:disable-next-line: typedef
   refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  // tslint:disable-next-line: typedef
  onEdit(emp: Employee)
  {
      this.employeeService.selectedEmployee = emp;
  }

  // tslint:disable-next-line: typedef variable-name
  onDelete(_id: string, form: NgForm)
  {
    // tslint:disable-next-line: triple-equals
    if (confirm('Are you sure to delete?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted succeesfully', classes: 'rounded' });
      });
    }
  }

}
