import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  listUsers() {
    return this.http.get(`${this.apiUrl}/manage-users`);
  }

  addUser(data: any) {
    return this.http.post(`${this.apiUrl}/add-user`, data);
  }

  updateUser(data: any) {
    return this.http.post(`${this.apiUrl}/update-user`, data);
  }

  deleteUser(id: string) {
    return this.http.get(`${this.apiUrl}/delete-user?id=${id}`);
  }

  getStats() {
    return this.http.get(`${this.apiUrl}/user-stats`);
  }
}
