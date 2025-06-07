import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, Routes, withComponentInputBinding} from '@angular/router';

import {provideHttpClient} from "@angular/common/http";
import {Products} from "./product/products.component";
import {ProductPage} from "./product/productPage.component";
import {ProductAddForm} from "./product/productAddForm";
import {SignIn} from "./user/sign-in.component";
import {SignUp} from "./user/sign-up.component";
import {UserService} from "./user/user-service";

const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'home', loadComponent: () => import("./home/home").then(c => c.Home),
    // component: Home, // use this if you want to load the component eagerly
  },
  {
    path: 'products', component: Products,
    canActivate: [() => inject(UserService).isLoggedIn()]
  },
  {
    path: 'products/:id', component: ProductPage,
  },
  {
    path: 'add-product', component: ProductAddForm,
  },
  {
    path: 'signin', component: SignIn
  },
  {
    path: 'signup', component: SignUp
  },
  // {
  //   path: 'users', component: Users,
  // },
  {
    path: '**', redirectTo: 'home'
  }
];

const init = () => {
  const userService = inject(UserService)
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if (token) {
    userService.token.set(token)
  }
  if (user) {
    // login??
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(init),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding())
  ]
};
