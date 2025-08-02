import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class CustomerModule { }
