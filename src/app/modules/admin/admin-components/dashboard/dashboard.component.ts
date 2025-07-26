import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,CommonModule, ReactiveFormsModule,NzButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


categories: any = [];
validateForm: FormGroup;
size: NzButtonSize = 'large';
isSpinning: boolean;

constructor(private adminService: AdminService,
    private fb: FormBuilder) {}

ngOnInit(): void {
    this.validateForm = this.fb.group({
        title: [null, [Validators.required]],
    });
    this.getAllCategories();
}


submitForm() {
    this.isSpinning = true;
    this.categories = [];
    this.adminService.getAllCategorieByTitle(this.validateForm.get(['title']).value).subscribe((res) => {
      console.log(res);
            res.forEach(element => {
                element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
                this.categories.push(element);               
                this.isSpinning = false;
            });
        });
}

getAllCategories() {
    this.categories = [];
    this.adminService.getAllCategorie().subscribe((res) => {
        res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            this.categories.push(element);
        });
    });
}
}
