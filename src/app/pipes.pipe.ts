import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(value: any, searchTerm : string) {

    if (value.length===0 || searchTerm ==='' ) {
      return  value
    }

    var customer=[]
    for(var customers of value){  
      if (customers['customerName'].toLowerCase().match(searchTerm.toLowerCase()) ||customers['customerAddress'].toLowerCase().match(searchTerm.toLowerCase()) ) {  
         customer.push(customers);
      }
    }
    return customer
  }

}
