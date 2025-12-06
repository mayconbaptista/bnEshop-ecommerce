import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiService = inject(ProductApiService);

  private productsCache: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  getAll(): Observable<Product[]> {
    if (this.productsCache.length > 0) {
      return of(this.productsCache);
    }

    return this.productApiService.getProducts().pipe(
      tap((products: Product[]) => {
        this.productsCache = products;
        this.productsSubject.next(products);
      })
    );
  }

  filterCartProducts(ids: string[]): Observable<Product[]> {

    let restantes: string[] = [];
    let encontrados: Product[] = [];

    if(this.productsCache.length > 0){
      encontrados = this.productsCache.filter(product => ids.includes(product.id as string));
      restantes = ids.filter(id => !encontrados.some(product => product.id === id));

      if(restantes.length === 0){
        return of(encontrados);
      }
    }

    return this.productApiService.filterProducts(restantes).pipe(
      tap((products: Product[]) => {

        encontrados = encontrados.concat(products).sort((a, b) => a.name.localeCompare(b.name));

        this.productsCache = this.productsCache.concat(products);
        this.productsSubject.next(encontrados);

        return encontrados;
      })
    );
  }

  getOffers(): Observable<Product[]> {
    const numberOfOffers = 5;
    return this.getAll().pipe(
      map((products) => products.slice(0, numberOfOffers))
    );
  }

  getById(id: string): Observable<Product | undefined> {
    if (this.productsCache.length > 0) {
      const product = this.productsCache.find((p) => p.id === id);
      if (product) {
        return of(product);
      }
    }

    return this.productApiService.getProduct(id).pipe(
      tap((product: Product | undefined) => {
        console.log("product :", product)
      }),
      tap({
        next: value => console.log("Next Notification: ", value),
        error: err => console.error("Error notification: ", err),
        complete: () => console.log("complete notofication")        
      })
    );
  }
}
