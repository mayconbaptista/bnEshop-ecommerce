import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private http = inject(HttpClient);
  private baseService = inject(ApiService);
  private apiCartUrl = 'api/Cart';

  constructor() { }

  public Adicionar(item:CartItem): Observable<CartItem> {
    return this.baseService.post<CartItem>(`${this.apiCartUrl}/add`, item);
  }

  public Atualizar(data:CartItem): Observable<CartItem> {
    return this.baseService.put<CartItem>(`${this.apiCartUrl}/update`, data);
  }

  public Remover(productId: string): Observable<void> {
    return this.baseService.delete<void>(`${this.apiCartUrl}/remove/${productId}`);
  }

  public listarTodos(): Observable<CartItem[]>{
    return this.baseService.get<CartItem[]>(`${this.apiCartUrl}/itens`);
  }
}
