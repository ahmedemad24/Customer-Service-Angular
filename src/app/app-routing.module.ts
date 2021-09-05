import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CustomerComponent} from './customer/customer.component'
import {CallsComponent} from './calls/calls.component'

const routes: Routes = [
{path:'',component:CustomerComponent},

{path:'customer',component:CustomerComponent},
{path:'calls/:id',component:CallsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
