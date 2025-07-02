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

  createAuthorizationHeader():HttpHeaders{
    let authHeader : HttpHeaders = new HttpHeaders();
    return authHeader.set(
      "Authorization","Bearer"+ StorageService.getToken()
    );
  }
}
