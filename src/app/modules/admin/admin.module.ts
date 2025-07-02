import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
