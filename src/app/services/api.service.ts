import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly ROOT_URL = 'http://localhost:8088/api/v1';



  constructor(private http: HttpClient) { }

  get(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${endpoint}`, { params });
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${endpoint}`, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/${endpoint}`, data)
  }

  patch(endpoint: string, data: any): Observable<any> {
    return this.http.patch(`${this.ROOT_URL}/${endpoint}`, data);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${endpoint}`);
  }

  login(phoneNumber: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users/login`,
      {
        phone_number: phoneNumber,
        password: password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'vi'
        }),
        observe: 'response'
      }
    );
  }

  register(data: any) {
    return this.http.post(
      `${this.ROOT_URL}/users/register`,
      data ,
      { 
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'vi'
        }),
        observe: 'response'
      }
    );
  }

}
