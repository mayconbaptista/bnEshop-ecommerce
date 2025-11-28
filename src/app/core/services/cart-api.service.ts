import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

interface ApiProductCart{
  productId:string;
  quantidade:number;
}

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private http = inject(HttpClient);
  private baseService = inject(ApiService);
  private apiCartUrl = '/api/Cart';

  constructor() { }

  Adicionar(product:Product): Observable<Product> {
    return this.baseService.post<Product>(`${this.apiCartUrl}/add`, product)
      .pipe(
        map((apiProducts) =>
          apiProducts.map((apiProduct) => this.mapApiProductToProduct(apiProduct))
        )
      );
  }

  private ParaApiProductCart(product:Product):ApiProductCart{
    return {
      id: product.id,
      quantidade: 1
    }
  }
}
