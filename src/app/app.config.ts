import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, Routes, withComponentInputBinding} from '@angular/router';

import {provideHttpClient} from "@angular/common/http";
import {UserService} from "./user/user-service";
import routes from "./app.route";

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
