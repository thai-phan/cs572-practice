import {Component, inject} from '@angular/core';
import {ProductService} from "./product/product.service";
import {Router, RouterOutlet} from "@angular/router";
import {UserService} from "./user/user-service";
import {Initial_State} from "./types";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
<!--    <h1>Welcome to Diary App</h1>-->
    @if (userService.isLoggedIn()) {
      <button (click)="onLogout()">Logout</button>
    }
    <router-outlet></router-outlet>
  `,
  styles: [],
})

export class App {
  httpService = inject(ProductService)
  userService = inject(UserService)

  router = inject(Router)
  // protected data = signal<Root>({} as Root);

  // total = computed(() => this.data().total);


  onLogout() {
    this.userService.token.set('')
    this.userService.user.set(Initial_State)
    this.router.navigate(['', 'sign-in'])
    // localStorage.clear()
  }

}
