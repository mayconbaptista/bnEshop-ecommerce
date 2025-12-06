import { Component, computed, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { CartProduct } from '../../../../core/models/cart-product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartApiService } from '../../../../core/services/cart-api.service';
import { CartItem } from '../../../../core/models/cart-item';

@Component({
  selector: 'app-cart-product',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart-product.component.html',
})
export class CartProductComponent {
  cartProduct = input.required<CartProduct>();
  protected total = computed(() => this.cartProduct().product.price * this.cartProduct().quantity);

  private cartApiService = inject(CartApiService);
  updateCartEvent = output<void>();


  protected async updateQuantity(num: number):Promise<void> {
    
    const updatedItem = {
      productId: this.cartProduct().product.id,
      quantity: num
    };

    await this.cartApiService
      .Atualizar(updatedItem)
      .subscribe({
        next: (response:CartItem) => {
          this.cartProduct().quantity = response.quantity;
          this.updateCartEvent.emit();
        },
        error: (error) => {
          window.alert('Error updating quantity:' + error);
        }
      });
  }

  removeProduct() {
    
    this.cartApiService
    .Remover(this.cartProduct().product.id).subscribe({
      next: () => {
        this.updateCartEvent.emit();
      },
      error: (error) => {
        window.alert('Error removing product:' + error);
      }
    });
  }
}
