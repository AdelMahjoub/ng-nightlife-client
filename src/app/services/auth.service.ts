import { ApiEndPointService } from './api-endpoint.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";

@Injectable()
export class AuthService {
  
  baseUrl: string;

  userLogin = new Subject();
  userLogout = new Subject();

  constructor(
    private http: Http,
    private apiEndPoint: ApiEndPointService) {
      this.baseUrl = apiEndPoint.getUrl();
    }

  isAuthenticated(): Observable<any> {
    const headers = {
      'Content-Type': 'Application/JSON'
    }
    let token = this.getTokenFromStorage();
    return this.http.post(`${this.baseUrl}/check-token`, {token}, headers)
      .map(
        (response: Response) => {
          return response.json()
        }
      )
  }
  
  signupUser(email: string, password: string): Observable<any> {
    const headers = {
      'Content-Type': 'Application/JSON'
    }
    return this.http.post(`${this.baseUrl}/signup`, {email, password}, headers)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }

  loginUser(email: string, password: string): Observable<any> {
    const headers = {
      'Content-Type': 'Application/JSON'
    }
    return this.http.post(`${this.baseUrl}/login`, {email, password}, headers)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): string {
    return localStorage.getItem('token');
  }

  storeUserId(userId: string): void {
    localStorage.setItem('userId', userId)
  }

  getUserIdFromStorage(): string {
    return localStorage.getItem('userId');
  }

  clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.userLogout.next();
  }

}