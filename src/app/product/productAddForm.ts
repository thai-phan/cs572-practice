// angular form to add a product

import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ProductService} from './product.service';
import {Router} from '@angular/router';
import {Dimensions, Meta, Product, Review} from './ProductType';


@Component({
  selector: 'app-product-add-form',
  template: `
    <mat-card>
      <mat-toolbar color="primary">
        <span>Add New Product</span>
      </mat-toolbar>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required/>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" required></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" required/>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Add Product</button>
      </form>
    </mat-card>
    <button (click)="onSubmit()">Submit</button>
  `,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})

export class ProductAddForm {
  service = inject(ProductService)

  productForm = inject(FormBuilder).group({
    product: "",
    title: '',
    description: '',
    price: ''
  })



  onSubmit() {
    let dimentions: Dimensions = {
      width: 0,
      height: 0,
      depth: 0
    }

    let review: Review = {
      rating: 0,
      comment: '',
      date: '',
      reviewerName: '',
      reviewerEmail: ''
    }

    let meta: Meta = {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: ''
    }

    this.service.addProduct({
      id: 0,
      title: '',
      description: '',
      category: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: [],
      sku: '',
      weight: 0,
      dimensions: dimentions ,
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: '',
      reviews: [],
      returnPolicy: '',
      minimumOrderQuantity: 0,
      meta: meta,
      images: [],
      thumbnail: ''
    })
  }
}