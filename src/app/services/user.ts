import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  editProfile(data: any) {
    return this.http.post(`${this.apiUrl}/edit`, data);
  }

  getHome() {
    return this.http.get(`${this.apiUrl}/home`);
  }

  loadForgetPassword() {
    return this.http.get(`${this.apiUrl}/forget`);
  }


  forgetVerify(data: any) {
    return this.http.post(`${this.apiUrl}/forget`, data);
  }


  loadResetPassword() {
    return this.http.get(`${this.apiUrl}/forget-password`);
  }

  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/forget-password`, data);
  }
}
