import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = ["http://localhost:8080/"]


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient) { }


  getAllCategorie():Observable<any>{
      
      return this.http.get<[]>(BASIC_URL + "api/customer/categories",
        {
          headers : this.createAuthorizationHeader()
        })
    }

    getCategoriesByName(title: string):Observable<any>{
      
      return this.http.get<[]>(BASIC_URL + `api/customer/categories/${title}`,
        {
          headers : this.createAuthorizationHeader()
        })
    }

    // Product Operation

     getProductsByCategory(categoryId: number):Observable<any>{
      
      return this.http.get<[]>(BASIC_URL + `api/customer/${categoryId}/products`,
        {
          headers : this.createAuthorizationHeader()
        })
    }

    getProductsByCategoryAndTitle(categoryId: number ,title : String):Observable<any>{
        
        return this.http.get<[]>(BASIC_URL + `api/customer/${categoryId}/product/${title}`,
          {
            headers : this.createAuthorizationHeader()
          })
      }


  createAuthorizationHeader():HttpHeaders{
    let authHeader : HttpHeaders = new HttpHeaders();
    return authHeader.set(
      "Authorization", "Bearer "+ StorageService.getToken()
    );
  }
}
