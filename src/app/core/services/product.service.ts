import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiService = inject(ApiService);

  private productsCache: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  getAll(): Observable<Product[]> {
    if (this.productsCache.length > 0) {
      return of(this.productsCache);
    }

    return this.apiService.get<Product[]>('products').pipe(
      tap((products) => {
        this.productsCache = products;
        this.productsSubject.next(products);
      })
    );
  }

  getOffers(): Observable<Product[]> {
    return this.getAll().pipe(
      map((products) => products.filter((product) => product.previousPrice))
    );
  }

  getById(id: string): Observable<Product | undefined> {
    if (this.productsCache.length > 0) {
      const product = this.productsCache.find((p) => p.id === id);
      if (product) {
        return of(product);
      }
    }

    return this.apiService.get<Product>(`products/${id}`);
  }
}
