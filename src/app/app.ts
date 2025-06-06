import {Component, effect, inject, signal} from '@angular/core';
import {ProductService} from "./product/product.service";
import {RouterOutlet} from "@angular/router";
import {UserService} from "./user/user-service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to Diary App</h1>
    @if (userService.isLoggedIn()) {
      <button>Logout</button>
    }
    <router-outlet></router-outlet>
  `,
  styles: [],
})

export class App {
  httpService = inject(ProductService)
  userService = inject(UserService)
  msg = signal('Hello from Parent!');

  // protected data = signal<Root>({} as Root);

  // total = computed(() => this.data().total);


  constructor() {
    // this.httpService.products(this.limit(), this.skip()).subscribe({
    //   next: (root: Root) => {
    //     this.data.set(root);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // });
    //
    //     .subscribe(response => {
    //       console.log(response);
    // })
    //     .subscribe({
    //   next: (data: Root) => {
    //     this.data.set(data);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // })
    // fetch(`https://dummyjson.com/recipes?limit=${this.limit()}&skip=${this.skip()}`).then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    //
    // }).then(data => {
    //   this.data.set(data);
    // });
    // effect(() => {
    //   console.log("App effect!!!");
    //   // #title = this.httpService.title;
    // })
  }

  // nextPage() {
  //   this.httpService.nextPage();
  // }
  //
  // previousPage() {
  //   this.httpService.previousPage();
  // }

}
