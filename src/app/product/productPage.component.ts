import {ChangeDetectionStrategy, Component, effect, inject, input, Input, signal} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule, MatCardTitle
} from '@angular/material/card';
import {Product} from "./ProductType";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "./product.service";


@Component({
  selector: "product-card",
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardTitle
  ],
  template: `
    <h2>Products - Page {{ page }}</h2>
    <mat-card class="example-card" appearance="outlined">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>{{ product().title }}</mat-card-title>
        <!--        <mat-card-subtitle>Dog Breed</mat-card-subtitle>-->
      </mat-card-header>
      <img mat-card-image src="" alt="Photo of a Shiba Inu">
      <mat-card-content>
        <p>
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
          A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
          bred for hunting.
        </p>
      </mat-card-content>

    </mat-card>



  `
})

export class ProductPage {
  page: number = 1;
  @Input() id!: string;

  productService = inject(ProductService)
  product = signal<Product>({} as Product)

  constructor(private route: ActivatedRoute) {

    // this.route.queryParams.subscribe(params => {
    //   this.page = +params['page'] || 1; // Default to 1 if not provided
    // });


    effect(() => {
      this.productService.getProduct(this.id).subscribe(product => {
        this.product.set(product)
      })
    });
  }


}

//
// @Component({
//   selector: 'product-card',
//   template: `
//     <mat-card appearance="outlined">
//       <mat-card-header>
//         <mat-card-title>{{ $product.title }}</mat-card-title>
//         <mat-card-subtitle>{{ $product.description }}</mat-card-subtitle>
//         <mat-card-subtitle>{{ $product.rating}}</mat-card-subtitle>
//       </mat-card-header>
//       <mat-card-actions align="end">
//         <button matButton>Learn More</button>
//       </mat-card-actions>
//     </mat-card>
//     <div>{{ $message() }}</div>
//   `,
//   imports: [MatCardModule, MatButtonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProductCard {
//
//   @Input() $product: Products = {} as Products; // input from parent component
//   // signal, computed, effect
//
//   input: any;
//
//   constructor() {
//     this.input = {};
//   }
//
// }

