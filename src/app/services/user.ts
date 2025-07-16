import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

  // ✅ Register a new user
  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  // ✅ Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // ✅ Get profile by user ID
  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit?id=${userId}`);
  }

  // ✅ Update user profile
  updateProfile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, formData);
  }

  // ✅ Send reset link to email
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget`, { email });
  }

  // ✅ Reset password with token
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget-password`, data);
  }

  // ✅ Forget password verification (used for forget-password.component.ts)
  forgetVerify(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget`, data);
  }

  // ✅ Fetch the logged-in user's home data
  getHome(): Observable<any> {
    return this.http.get(`${this.baseUrl}/home`);
  }

  // ✅ Edit profile alias (if you're using editProfile instead of updateProfile in your component)
  editProfile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit`, formData);
  }
}
