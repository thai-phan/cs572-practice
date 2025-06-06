import {effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product, Root} from "./ProductType";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #httpClient = inject(HttpClient);
  limit = signal(5);
  skip = signal(0);
  title = signal("Title");

  constructor() {
    effect(() => {
      console.log("service effect");
    });
  }

  products = this.#httpClient.get<Root>(`https://dummyjson.com/products?limit=${this.limit()}&skip=${this.skip()}`)


  getProduct(id: string) {
    return this.#httpClient.get<Product>(`https://dummyjson.com/products/${id}`)
  }

  addProduct(product: Product) {
    this.#httpClient.post(`https://dummyjson.com/products/add`, {
      product
    }).subscribe(res => {
      console.log(res)
    })
  }

  updateProduct(product: Product) {
    this.#httpClient.put(`https://dummyjson.com/products/${product.id}`, {
      product
    }).subscribe(res => {
      console.log(res)
    })
  }

  deleteProduct(id: string) {
    this.#httpClient.delete(`https://dummyjson.com/products/${id}`)
        .subscribe(res => {
          console.log(res)
        })
  }

  changePage(index: number, size: number) {
    this.skip.set(index * size);
    this.limit.set(size)
    this.products = this.#httpClient.get<Root>(`https://dummyjson.com/products?limit=${this.limit()}&skip=${this.skip()}`)
    // this.products.subscribe(data => {
    //   this.title.set(data.products[0]?.name || 'No Recipes')
    // })
  }
}
