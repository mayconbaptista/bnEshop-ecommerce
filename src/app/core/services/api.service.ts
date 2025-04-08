import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private mockApiService = inject(MockApiService);
  private apiUrl = environment.apiUrl;
  private useMockApi = environment.useMockApi;

  get<T>(endpoint: string, params?: any): Observable<T> {
    if (this.useMockApi) {
      if (endpoint === 'products') {
        return this.mockApiService.getProducts() as unknown as Observable<T>;
      } else if (endpoint.startsWith('products/')) {
        const id = endpoint.split('/')[1];
        return this.mockApiService.getProduct(id) as unknown as Observable<T>;
      }
    }
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
