import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee : Employee;
  employeeList: Employee[];
  total_employees: number;
  page_no: number;

  constructor(private http: Http) { }

  getEmployees(page_no: number){
    console.log("calling api in getEmployees");
    console.log("pageNo"+page_no);
    return this.http.get("http://localhost:3000/employees/"+this.page_no)
    .map((data: Response) => {
      return data.json() ;
    }).toPromise().then(x => {  
      console.log(x);
      this.total_employees = x.total_employees;
      this.employeeList = x.employees_data;
      console.log(this.total_employees);
    })
  }

  postEmployee(emp: Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Post,headers:headerOptions});
    console.log(this.http.post("http://localhost:3000/employee",body,requestOptions).map(x=> x.json));
    return this.http.post("http://localhost:3000/employee",body,requestOptions).map(x=> x.json);
  }

  putEmployee(id: number, emp: Employee){
    console.log("Emp_no"+id);
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Put,headers:headerOptions});
    return this.http.put("http://localhost:3000/employee/"+id,body,requestOptions).map(x=> x.json);
  }

  deleteEmployee(id: number){
    console.log("id to be deleted"+id);
    console.log("http://localhost:3000/employee/"+id);
    return this.http.delete("http://localhost:3000/employee/"+id).map(x=> x.json);
  }
}
