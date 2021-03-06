import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  token: string = undefined;

  constructor(
    private http: HttpClient
  ) { }


  storeUserToken(token: any) {
    // console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, token);
    this.token = token;

  }

  loadUserToken() {
    this.token = localStorage.getItem(this.tokenKey);
    console.log('tokenLoaded');
  }

  login(email: string, password: string) {
    const data = {email, password};
    return this.http.post(`${URL}auth/login`, data);
  }

  signIn(email: string, password: string) {
    const data = {email, password};
    return this.http.post(`${URL}auth/signup`, data);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
