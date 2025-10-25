import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductComponent } from './features/product/product.component';
import { PaymentSuccessComponent } from './features/payment/payment-success/payment-success.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  {
    path: 'PaymentSuccess',
    component: PaymentSuccessComponent,
  },
];
