import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { AdminService } from '../../admin-service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-product',
  imports: [DemoNgZorroAntdModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent{

 productId: any ;
  //this.activatedRoute.snapshot.params['productId'];
  isSpinning = false;
  validateForm! : FormGroup;
  imgChanged = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
 this.productId = this.activatedRoute.snapshot.params['productId'];
 this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getProductById();  
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe((res) => {
      console.log(res);
      const productDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
      this.validateForm.patchValue(productDto);
    })
  }

  updateProduct(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    
    if (this.imgChanged && this.selectedFile) {
        formData.append('img', this.selectedFile);
    }
    
    formData.append('name', this.validateForm.get('name').value);
    formData.append('price', this.validateForm.get('price').value);
    formData.append('description', this.validateForm.get('description').value);
    
    console.log(formData);
    
    this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
        this.isSpinning = false;
        
        if (res.id != null) {
            this.message.success(
                `Product updated Successfully.`,
                { nzDuration: 5000 }
            );
            this.router.navigateByUrl('/admin/dashboard');
        } else {
            this.message.error(
                "Something went wrong",
                { nzDuration: 5000 }
            );
        }
    });
}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
