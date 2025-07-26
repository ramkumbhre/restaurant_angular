import { Component, NgModule, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { title } from 'node:process';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent implements OnInit {
    categoryId: any;
    // this.activatedroute.snapshot.params['categoryId'];
    Products: any = [];
    isSpinning: boolean;
    validateForm: FormGroup;
    size : NzButtonSize ='large';

    constructor(
      private adminService: AdminService,
      private activatedroute: ActivatedRoute,
      private fb: FormBuilder,
      private message: NzMessageService) {}

    ngOnInit(): void {
            this.categoryId = this.activatedroute.snapshot.params['categoryId'];
      this.validateForm = this.fb.group({
        title: [null,[Validators.required]],
      })
        this.getProductByCategory();
    }

    submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.adminService.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value)
    .subscribe((res) => {
            console.log(res);
            res.forEach(element => {
                element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
                this.Products.push(element);
                this.isSpinning = false;
          });
       });
    }

    getProductByCategory() {
        this.Products = [];
        this.adminService.getProductsByCategory(this.categoryId).subscribe((res) => {
            res.forEach(element => {
                element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
                this.Products.push(element);
            });
        });
    }


  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe((res) => {
        if (res == null) {
            this.getProductByCategory();
            this.message
                .success(
                    `Product Deleted Successfully.`,
                    { nzDuration: 5000 }
                );
        } else {
            this.message
                .error(
                    `Something went wrong`, 
                    { nzDuration: 5000 }
                )
        }
      });
  }
}
