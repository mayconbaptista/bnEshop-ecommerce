import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

interface ApiProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private http = inject(HttpClient);
  private baseService = inject(ApiService);
  private apiCatalogProductUrl = 'api/catalog/product';

  getProducts(): Observable<Product[]> {
    return this.baseService.get<ApiProduct[]>(`${this.apiCatalogProductUrl}/filter`)
      .pipe(
        map((apiProducts) =>
          apiProducts.map((apiProduct) => this.mapApiProductToProduct(apiProduct))
        )
      );
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.baseService.get<ApiProduct>(`${this.apiCatalogProductUrl}/${id}`)
      .pipe(
        map((apiProduct) => {
          if(apiProduct) return this.mapApiProductToProduct(apiProduct);

          return undefined;
        })
      )
  }

  private mapApiProductToProduct(apiProduct: ApiProduct): Product {
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description,
      urlImg: environment.AwsS3ServiceUrl.concat(apiProduct.image),
      reviews: apiProduct.rating.count,
      price: apiProduct.price,
      previousPrice: null, // api
    };
  }
}
