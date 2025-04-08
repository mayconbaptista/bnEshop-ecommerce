import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../../shared/models/product';
import { PRODUCTS } from '../../mock/products';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private products = PRODUCTS;

  getProducts(): Observable<Product[]> {
    return of([...this.products]).pipe(delay(800));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product).pipe(delay(800));
  }
}
