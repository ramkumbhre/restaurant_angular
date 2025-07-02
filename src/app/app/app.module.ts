import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from '../auth-components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoginComponent } from '../auth-components/login/login.component';
import { AppComponent } from '../app.component';
import { ɵNzTabNavBarComponent } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    SignupComponent,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    NzFormModule,
    LoginComponent,
    AppComponent,
    ɵNzTabNavBarComponent,
    NzButtonModule,
    NzLayoutModule, 
    RouterModule,

    
  ]
})
export class AppModule { }
