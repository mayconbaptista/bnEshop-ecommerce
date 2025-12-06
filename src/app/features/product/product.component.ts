import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Observable } from 'rxjs';
import { CartApiService } from '../../core/services/cart-api.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  id = input<string>('');
  product$!: Observable<Product | undefined>;

  private cartApiService = inject(CartApiService);
  private productService = inject(ProductService);
  
  ngOnInit(): void {
    this.product$ = this.productService.getById(this.id());
  }

  addToCart(product: Product) {
    
    const cartRequest = {
      productId: product.id,
      quantity: 1
    }
    
    this.cartApiService.Adicionar(cartRequest).subscribe({
      next: () => window.alert("produto inserido ao carrinho com sucesso"),
      error: (err) => window.alert("erro ao inserir produto ao carrinho")
    });
  }
}
