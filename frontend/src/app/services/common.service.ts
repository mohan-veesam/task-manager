import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public apiUrl = 'http://localhost:5000/api';
  
  constructor(private http:HttpClient){}

  // getAll(entity: string) {
  //   return this.http.get<any[]>(`${this.apiUrl}/${entity}`);
  // }
  getAll(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  post(entity: string, data: any) {
    return this.http.post(`${this.apiUrl}/${entity}`, data);
  }

  put(entity: string, id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${entity}/${id}`, data);
  }

  delete(entity: string, id: string) {
    return this.http.delete(`${this.apiUrl}/${entity}/${id}`);
  }

  // 🔐 Login
  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // 🔁 Reset Password
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, data);
  }
}
