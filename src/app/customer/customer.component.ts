import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable} from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../Services/Customer/customer';
import { CustomerService } from '../Services/Customer/customer.service';
import * as XLSX from 'xlsx';



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service:CustomerService ,private formbulider: FormBuilder , public ar:ActivatedRoute, private http: HttpClient) { }
  public CustomersList:any [] = [];
  public ListofCustomers : Customer [] = [];
  CustomerForm: any;  
  AllCustomers?: Observable<any[]>;  
  newCustomer:Customer=new Customer;
  page:any = 1;
  items:any = [];
  itemsShown: any = [];
  TotalLength:any;
  Name = false;
  searchTerm : string='';
  fileName= 'ExcelSheet.xlsx';

  ngOnInit(): void {
    this.CustomerForm = this.formbulider.group({  
      CustomerId: ['', [Validators.required]],  
      CustomerName: ['', [Validators.required]],  
      CustomerAddress: ['', [Validators.required]],  
      CustomerPhone: ['', [Validators.required]],  
      CustomerEmail: ['', [Validators.required]],  
    });  
    this.CustomerForm.reset();
    this.service.GetAllCustomers().subscribe(data =>{
      this.CustomersList = data;
    })
    this.RefreshCustList();
  }

  Print(){
    window.print();
  }
  
  exportexcel()
  {
    let element = document.getElementById('table-excel');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.CustomerForm.controls;
  }

  RefreshCustList()
  {
    this.service.GetAllCustomers().subscribe(data =>{
      this.CustomersList = data;
    })
  }
  AddNewCustomer(){
  if (this.CustomerForm.controls['CustomerId'].value==null) {
    this.newCustomer.CustomerName=this.CustomerForm.controls['CustomerName'].value
    this.newCustomer.CustomerAddress=this.CustomerForm.controls['CustomerAddress'].value
    this.newCustomer.CustomerPhone=this.CustomerForm.controls['CustomerPhone'].value
    this.newCustomer.CustomerEmail=this.CustomerForm.controls['CustomerEmail'].value
    console.log(this.CustomerForm.controls['CustomerName'].value)
    console.log(this.newCustomer)

    this.service.AddCustomer(this.newCustomer).subscribe(res =>{
      this.RefreshCustList();  
      this.CustomerForm.reset();

    });
  }else{
    console.log(this.CustomerForm.controls['CustomerId'].value)
    this.newCustomer.CustomerName=this.CustomerForm.controls['CustomerName'].value
    this.newCustomer.CustomerId=this.CustomerForm.controls['CustomerId'].value
    this.newCustomer.CustomerAddress=this.CustomerForm.controls['CustomerAddress'].value
    this.newCustomer.CustomerPhone=this.CustomerForm.controls['CustomerPhone'].value
    this.newCustomer.CustomerEmail=this.CustomerForm.controls['CustomerEmail'].value
    this.service.EditCustomer(this.newCustomer).subscribe(e=>{console.log(e)
      this.RefreshCustList();  
      this.CustomerForm.reset();

    },er=>{console.log(er)})

  }
   
  }
  updateCustomer(id : number){
  this.service.GetCustomer(id).subscribe(e=>{
  this.CustomerForm.controls['CustomerName'].setValue(e.customerName);  
  this.CustomerForm.controls['CustomerId'].setValue(e.customerId);  
  this.CustomerForm.controls['CustomerAddress'].setValue(e.customerAddress);  
  this.CustomerForm.controls['CustomerPhone'].setValue(e.customerPhone);  
  this.CustomerForm.controls['CustomerEmail'].setValue(e.customerEmail);  
  })   
  }

  deleteCustomer(Customer: any) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.service.DeleteCustomer(Customer).subscribe(() => {  
      this.RefreshCustList();  
      });  
    }  
  }
  
  fetchPosts(): void {
    if (this.ar.snapshot.params["Name"]=="All Names") {
      this.service.GetAllCustomers().subscribe(e=>{this.items=e; this.TotalLength=e.length;console.log(e)},er=>console.log(er))
      this.Name=true
    }
    else{
      this.Name=false
      this.service.GetAllCustomers().subscribe(e=>{this.items=e; this.TotalLength=e.length;console.log(e)},er=>console.log(er))
    }
  }

  onTableDataChange(event:any){
    this.page = event;
    this.RefreshCustList();
  }
}


