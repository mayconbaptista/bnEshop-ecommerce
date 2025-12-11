import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductComponent } from './features/product/product.component';
import { PaymentSuccessComponent } from './features/checkout/payment/payment-success/payment-success.component';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

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
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];
