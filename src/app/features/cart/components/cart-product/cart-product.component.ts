import { Component, computed, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { CartProduct } from '../../../../core/models/cart-product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartApiService } from '../../../../core/services/cart-api.service';
import { CartItem } from '../../../../core/models/cart-item';
import { NotificationHandlerService } from '../../../../core/services/notification-handler.service';

@Component({
  selector: 'app-cart-product',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart-product.component.html',
})
export class CartProductComponent {
  cartProduct = input.required<CartProduct>();
  private cartApiService = inject(CartApiService);
  private notification: NotificationHandlerService = inject(NotificationHandlerService);
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
          this.notification.handleHttpSuccess('Quantidade atualizada com sucesso!.');
        },
        error: (error) => {
          this.notification.handleHttpError(error);
        }
      });
  }

  removeProduct() {
    this.cartApiService
    .Remover(this.cartProduct().product.id).subscribe({
      next: () => {
        this.updateCartEvent.emit();
        this.notification.handleHttpSuccess('Produto removido com sucesso!.');
      },
      error: (error) => {
        this.notification.handleHttpError(error);
      }
    });
  }
}
