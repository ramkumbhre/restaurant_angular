import { Component } from '@angular/core';
import { DemoNgZorroAntdModule } from '../../../../DemoNgZorroAntdModule';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm : FormGroup;

  constructor(
    private service:AdminService,
    private fb:FormBuilder 
  ){}

  ngOnInit(){
    this.categoryForm = this .fb.group({
      name:[null, Validators.required],
      description:[null, Validators.required]
    })
  }

  postCategory(){
    console.log(this.categoryForm.value)
  }

}
