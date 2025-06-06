import {Component, effect, inject, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ProductCard} from "./productCard.component";
import {ProductPaginator} from "./paginator.component";
import {ProductService} from "./product.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'products',
  imports: [
    ProductCard,
    ProductPaginator,
    AsyncPipe
  ],
  template: `
    <button (click)="addProduct()">Add Product</button>
    
    @let root = httpService.products | async;
    <ul>
      @for (product of root?.products; track product.id) {
        <li>{{ product.title }}</li>
        <product-card [$product]="product"></product-card>
      } @empty {
        <li>There are no items.</li>
      }
    </ul>
    <product-paginator></product-paginator>
  `,
  styles: ``
})
export class Products {
  routers = inject(Router);
  httpService = inject(ProductService)

  constructor() {
    effect(() => {
      // console.log(this.page)
    });
  }



  addProduct() {
    this.routers.navigate(['add-product']);
  }
}
