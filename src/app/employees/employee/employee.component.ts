import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service'

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      console.log("in if statement");
    }
    this.employeeService.selectedEmployee = {
      emp_no: null,
      first_name: '',
      last_name: ''
    }
  }

  onSubmit(form: NgForm) {
    console.log("Emp_no"+form.value.emp_no);
    if (form.value.emp_no == null) {
      console.log("calling post function");
      this.employeeService.postEmployee(form.value)
        .subscribe((data) => {
          console.log(data);
          this.resetForm(form);
          this.employeeService.getEmployees();          
          this.toastr.success("New record added successfully", "Employee Register");
        });
    }
    else
    {
      console.log("calling put function");
      console.log("Emp_no"+form.value.emp_no);
      this.employeeService.putEmployee(form.value.emp_no,form.value)
        .subscribe((data) => {
          this.resetForm(form);
          this.employeeService.getEmployees();
          this.toastr.success("Record updated successfully", "Employee updated");
        });  
    }
  }

}
