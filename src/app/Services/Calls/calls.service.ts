import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Calls } from './calls';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  constructor(public http:HttpClient) { }

  baseUrl = "http://localhost:28600/api/"
  GetAllCalls()
  {
    return this.http.get<Calls[]>("http://localhost:28600/api/Calls")
  }
  GetAllCallsByCustomerId(id :number)
  {
    return this.http.get<Calls[]>(this.baseUrl+"Calls/GetAllCallsByCustomerId/"+id)
  }
  AddCall(form:any)
  {
    return this.http.post(this.baseUrl+"Calls",form)
  }

  GetCall(id:any)
  {
    return this.http.get<any>(this.baseUrl+`Calls/${id}`)
  }

  EditCall(edit:Calls){

    return this.http.put(this.baseUrl+"Calls/"+edit.CallId,edit)
  }

  DeleteCall(i:number,id:number){
    return this.http.delete(this.baseUrl+"Calls/"+i+"/"+id)
  }

}
