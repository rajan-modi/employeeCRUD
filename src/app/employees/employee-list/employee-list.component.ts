import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
   
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeService.page_no = 1;
    this.employeeService.getEmployees(this.employeeService.page_no);    
  }
  showForEdit(employee: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, employee);
  }
  onPageChange(page_no){
    this.employeeService.page_no = page_no;
    console.log("calling onPagechange");
    console.log(this.employeeService.page_no);
    this.employeeService.getEmployees(this.employeeService.page_no);
  }
  onDelete(id: number) {
    if (confirm('Are you sure you want  to delete this record?') == true) { 
      this.employeeService.deleteEmployee(id)
      .subscribe((x)=> {
        console.log("calling delete api");
        console.log(this.employeeService.page_no);
        this.employeeService.getEmployees(this.employeeService.page_no);
        this.toastr.success("Record deleted successfully", "Employee Register");
      }); 
    }
  }
}
