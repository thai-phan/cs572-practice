import {ChangeDetectionStrategy, Component, inject, input, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from "./ProductType";
import {Router} from "@angular/router";

@Component({
  selector: 'product-card',
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ $product.title }}</mat-card-title>
        <mat-card-subtitle>{{ $product.description }}</mat-card-subtitle>
        <mat-card-subtitle>{{ $product.rating}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions align="end">
        <button matButton (click)="selectProduct($product.id)">Learn More</button>
      </mat-card-actions>
    </mat-card>
  `,
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  @Input() $product: Product = {} as Product; // input from parent component

  router = inject(Router);

  // signal, computed, effect

  selectProduct(id: number) {
    // // this.router.navigate(['products', id], { queryParams: { page: id } }).then((a) => {
    // console.log(id)
    this.router.navigate([`products/${id}`])
  }

  input: any;

  constructor() {
    this.input = {};
  }

}

