import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { UserLogin, Token } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  private readonly authBaseUrl = 'api/Auth';
  private baseService:ApiService = inject(ApiService);

  constructor() { }

  public login(data:UserLogin): Observable<Token> {
    return this.baseService
      .post<Token>(`${this.authBaseUrl}/login`, data)
      .pipe(tap({
        next: (response: Token) => {

          console.log('1. Login successful:', response);

          localStorage.setItem('accessToken', response.accessToken);
        }
      }));
  }
}
