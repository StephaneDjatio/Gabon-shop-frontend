import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { serialize } from 'object-to-formdata';
import { ConstantComponent } from './constant/constant.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = ConstantComponent.url+'api/';

  constructor(private http: HttpClient, private router: Router) { }

  getMunicipalities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}municipality/`);
  }

  signUpClient(client: any) {

    const formData = serialize(
      client,
    );

    console.log(formData);

    return this.http.post<any>(`${this.apiUrl}clients/`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = this.http.post<any>(`${this.apiUrl}login/`, formData).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userToken', user.token);
        }
        return user;
      })
    );
    // const isLoggedIn = (email == 'pikachu' && password == 'pikachu');
    

    return response;
  }

  logout() {
    localStorage.removeItem('currentUser'); 
    this.router.navigate(['/signup']);
  }

  getShopList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}shops/`);
  }

  getShopById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}shop/${id}`);
  }

  getShopShelves(shopId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}shop-shelves/${shopId}`);
  }

  getShopShelveProducts(shopShelveId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}shelve-products/${shopShelveId}`);
  }
}
