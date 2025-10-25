import { Component, input } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home-product.component.html',
})
export class HomeProductComponent {
  product = input.required<Product>();
}
