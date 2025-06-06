import {Component, inject} from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ProductService} from "./product.service";

@Component({
  selector: 'product-paginator',
  template: `
    <mat-paginator [length]="100" [pageSize]="5" [pageSizeOptions]="[5]" (page)="change($event)">
      
    </mat-paginator>
  `,
  imports: [MatPaginatorModule],
})
export class ProductPaginator {
  service = inject(ProductService)

  change(event: PageEvent) {

    console.log(event.pageIndex);
    console.log(event.pageSize);

    this.service.changePage(event.pageIndex, event.pageSize)

  }
}
