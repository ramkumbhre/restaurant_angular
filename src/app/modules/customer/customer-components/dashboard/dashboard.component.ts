import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';

import { CustomerService } from '../../customer-service/customer.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,CommonModule, ReactiveFormsModule,NzButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories: any = [];
  isSpinning: boolean;
  validateForm: FormGroup;
  size:NzButtonSize = 'large';

constructor(private customerService: CustomerService,
  private fb : FormBuilder) {}

ngOnInit(): void {
   this.validateForm = this.fb.group({
    title: [null, Validators.required]
   })
    this.getAllCategories();
}

searchCategory(){
  

  this.categories = [];
  this.customerService.getCategoriesByName(this.validateForm.get(['title'])!.value).subscribe((res) => {
    console.log(res);
    res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            this.categories.push(element);
        });
     })
}




getAllCategories() {
    this.categories = [];
    this.customerService.getAllCategorie().subscribe((res) => {
        res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            this.categories.push(element);
        });
    });
}

}
