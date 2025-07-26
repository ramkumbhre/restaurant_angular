import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-service/storage.service';

const BASIC_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  postCategory(categoryDto: any):Observable<any>{
    
    return this.http.post<[]>(BASIC_URL + "api/admin/category", categoryDto,
      {
        headers : this.createAuthorizationHeader()
      })
  }

  getAllCategorie():Observable<any>{
    
    return this.http.get<[]>(BASIC_URL + "api/admin/categories",
      {
        headers : this.createAuthorizationHeader()
      })
  }

  getAllCategorieByTitle(title : String):Observable<any>{
    
    return this.http.get<[]>(BASIC_URL + `api/admin/categories/${title}`,
      {
        headers : this.createAuthorizationHeader()
      })
  }

   postProduct(categoryId : number, productDto: any):Observable<any>{
    
    return this.http.post<[]>(BASIC_URL + `api/admin/${categoryId}/product`, productDto,
      {
        headers : this.createAuthorizationHeader()
      })
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any[]>(BASIC_URL + `api/admin/${categoryId}/products`,
    {
        headers: this.createAuthorizationHeader()
    }
  )
}

  getProductsByCategoryAndTitle(categoryId: number ,title : String):Observable<any>{
    
    return this.http.get<[]>(BASIC_URL + `api/admin/${categoryId}/product/${title}`,
      {
        headers : this.createAuthorizationHeader()
      })
  }


  deleteProduct(productId: number ):Observable<any>{
    
    return this.http.delete<[]>(BASIC_URL + `api/admin/product/${productId}`,
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
