import { Component, OnInit } from '@angular/core';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { PRODUCTS } from '../mock/products';
import { HomeProductComponent } from './components/home-product/home-product.component';

@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent, HomeProductComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = PRODUCTS;
  productOffers: Product[] = [];

  ngOnInit(): void {
    this.productOffers = this.products.filter(
      (product) => product.previousPrice
    );
  }
}
