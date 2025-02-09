import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url: string = environment.baseUrl + 'auth';

  login(obj: any): Observable<any> {
    return this.http.post(this.url + '/login', obj);
  }

  setAuth(response: any){
    localStorage.setItem('token',response.token);
    localStorage.setItem('usuario',JSON.stringify(response.data));
  }

  removerAuth(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  getToken(){
    if (this.isBrowser()) {
      let token = localStorage.getItem('token');
      if(token != null){
        return token;
      }
    }

    return null;
  }

  getUsuario(){
    if (this.isBrowser()) {
      let userStr = localStorage.getItem('usuario');
      if(userStr != null){
        return JSON.parse(userStr);
      }
    }
    return null;
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined';
  }
}
