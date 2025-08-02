import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-product-by-category',
  imports: [CommonModule,ReactiveFormsModule,NzButtonModule],
  templateUrl: './view-product-by-category.component.html',
  styleUrl: './view-product-by-category.component.scss'
})
export class ViewProductByCategoryComponent {

  categoryId : number ; 
  Products =[];
  validateForm: FormGroup;
  size : NzButtonSize ='large';
  isSpinning : boolean = false;
  

  constructor(
    private activatedRoute : ActivatedRoute,
    private fb: FormBuilder,
    private service : CustomerService
  ){}

  ngOnInit(){
    this.categoryId = this.activatedRoute.snapshot.params["categoryId"];
    this.validateForm = this.fb.group({
        title: [null,[Validators.required]],
      })
    this.getProductsByCategory();
  }


  submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.service.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value)
    .subscribe((res) => {
            console.log(res);
            res.forEach(element => {
                element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
                this.Products.push(element);
                this.isSpinning = false;
          });
       });
    }



  getProductsByCategory(){
    this.service.getProductsByCategory(this.categoryId).subscribe((res) =>{
      console.log(res);
      res.forEach(element => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImg;
        this.Products.push(element);
      });
    })
  }

}
