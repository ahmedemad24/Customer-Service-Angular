import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  forms ?: Customer;

  constructor(public http:HttpClient) { }
  
  baseUrl = "http://localhost:28600/api/"

  GetAllCustomers()
  {
    return this.http.get<Customer[]>(this.baseUrl+"Customers")
  }

  AddCustomer(form:any)
  {
    return this.http.post(this.baseUrl+"Customers",form)
  }

  GetCustomer(id:any)
  {
    return this.http.get<any>(this.baseUrl+`Customers/${id}`)
  }

  EditCustomer(edit:Customer){

    return this.http.put(this.baseUrl+"Customers/"+edit.CustomerId,edit)
  }

  DeleteCustomer(i:number){

    return this.http.delete(this.baseUrl+"Customers/"+i)
  }
}
