import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CurrencyPipe } from '@angular/common';
import { CartProduct } from '../../core/models/cart-product';
import { CartApiService } from '../../core/services/cart-api.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartItem } from '../../core/models/cart-item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [
    CartProductComponent, 
    CurrencyPipe, 
    RouterLink
  ],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cartApiService:CartApiService = inject(CartApiService);
  productService = inject(ProductService);

  cartProducts: WritableSignal<CartProduct[]> = signal([]);
  
  protected total = computed(() => {
    const valor = this.cartProducts().reduce((acc, val) => acc + val.product.price * val.quantity, 0);
    console.log("Calculating total cart value: " + valor);
    return valor;
  });

  ngOnInit(): void {
    this.updateCart();
  }

  protected updateCart(): void {
    this.cartApiService
      .listarTodos()
      .pipe(switchMap( cartItens => {

        if(cartItens.length === 0) return of([]);

        const ids = cartItens.map(item => item.productId);

        return this
          .productService
          .filterCartProducts(ids)
          .pipe(map( products => {
            return products.map(product => {
              const cartItem = cartItens.find(item => item.productId === product.id);
              return {
                product,
                quantity: cartItem ? cartItem.quantity : 0
              };
            });
          }))
      })).subscribe({
        next: (cartProducts:CartProduct[]) => {
          this.cartProducts.set(cartProducts);
        },
        error: (err) => {
          window.alert("erro ao buscar dados do carrinho");
        },
        complete: () => {
          console.log("Completed fetching cart data");
        }
      });
  }

  public update():void {
    console.log(this.cartProducts());
    this.cartProducts.update(() => this.cartProducts().filter(x => x.quantity > 0));
    console.log(this.cartProducts());
  }
}