import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Calls } from '../Services/Calls/calls';
import { CallsService } from '../Services/Calls/calls.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

  constructor(public service:CallsService, private formbulider: FormBuilder, public ar:ActivatedRoute) { }
  public CallsList :any[] = [];
  CallsForm: any;  
  AllCalls?: Observable<any[]>;  
  newCall: Calls = new Calls
  page:any = 1;
  items:any = [];
  itemsShown: any = [];
  TotalLength:any;
  Name = false;

  ngOnInit(): void {
    this.CallsForm = this.formbulider.group({  
      CallId: ['', [Validators.required]],  
      callDate: ['', [Validators.required]],  
      CustomerId: ['', [Validators.required]],   
    });  
    this.RefreshCallsList();
  }
  
  RefreshCallsList()
  {
    this.service.GetAllCallsByCustomerId(this.ar.snapshot.params["id"]).subscribe(data =>{
      this.CallsList = data;
    })
  }
  
  AddNewCall(){
    this.newCall.CallDate=this.CallsForm.controls['callDate'].value
    this.newCall.CustomerId=this.ar.snapshot.params["id"]
    this.service.AddCall(this.newCall).subscribe(res =>{
      this.RefreshCallsList();  
      this.CallsForm.reset();

    });
  }
  
  updateCall(id : number){
  this.service.GetCall(id).subscribe(e=>{
  this.CallsForm.controls['callDate'].setValue(e.callDate);  
  this.CallsForm.controls['CustomerId'].setValue(e.customerId);   
  })   
  }

  deleteCall(callsid: any,customerId:number) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.service.DeleteCall(callsid,customerId).subscribe(() => {  
      this.RefreshCallsList();  
      });  
    }  
  } 

  fetchPosts(): void {
    if (this.ar.snapshot.params["Name"]=="All Names") {
      this.service.GetAllCalls().subscribe(e=>{this.items=e; this.TotalLength=e.length;console.log(e)},er=>console.log(er))
      this.Name=true
    }
    else{
      this.Name=false
      this.service.GetAllCalls().subscribe(e=>{this.items=e; this.TotalLength=e.length;console.log(e)},er=>console.log(er))
    }
  }

  onTableDataChange(event:any){
    this.page = event;
    this.RefreshCallsList();
  }
}
