import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './customer-components/dashboard/dashboard.component';
import { ViewProductByCategoryComponent } from './customer-components/view-product-by-category/view-product-by-category.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:":categoryId/products",component:ViewProductByCategoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

