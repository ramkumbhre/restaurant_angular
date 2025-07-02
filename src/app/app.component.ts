import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { RouterModule } from '@angular/router';
import { StorageService } from './auth-services/storage-service/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
     DemoNgZorroAntdModule,
    RouterModule,
    FormsModule,
    CommonModule,
    
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurant_angular';

  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();
 
  constructor(private router : Router){ }

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name ==="NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
         
      }
    })
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
