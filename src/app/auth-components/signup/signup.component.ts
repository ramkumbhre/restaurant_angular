import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning : boolean;
  validateForm: FormGroup;

  confirmationValidator =(control:FormControl): {[s:string]: boolean} =>{
    if(!control.value){
      return{requied: true};
    }else if(control.value !==this.validateForm.controls['password'].value){
      return{confirm: true, error: true}
    }
    return{};
  }

  constructor(private service: AuthService,
    private fb : FormBuilder,
    private notification: NzNotificationService ){ }

    ngOnInit(){
      this.validateForm = this.fb.group({ 
        email: ["",Validators.required],
        password: ["",Validators.required],
        checkPassword: ["",[Validators.required,this.confirmationValidator]],
        name: ["",Validators.required]
      })
    }
    
    register(){
      console.log(this.validateForm.value);
      this.service.signup(this.validateForm.value).subscribe((res)=>{
        console.log(res);
        if(res.id !=null){
          this.notification.success("success","You are registerd successfully",{nzDuration :5000});
        }else{
          this.notification.error("ERROR","Something went wrong",{nzDuration :5000});
        }
      })
    }
}
