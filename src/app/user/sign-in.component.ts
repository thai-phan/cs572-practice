import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";
import {AppToken} from "../types";

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h1>Sign In</h1>

    <form (ngSubmit)="submit()">
      <input placeholder="email" [formControl]="email">
      <input placeholder="password" type="password" [formControl]="password">
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
    <a [routerLink]="['/sign-up']">Sign Up</a>
  `,
  styles: ``
})

export class SignIn {
  router = inject(Router)
  #userService = inject(UserService)

  form = inject(FormBuilder).nonNullable.group({
    email: ['thai@gmail.com', Validators.required],
    password: ['12345678', Validators.required],
  })

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  submit() {
    this.#userService.signIn(this.form.value).subscribe(res => {
      console.log(res);
      const token = res.data.token;

      const decoded_token = JSON.parse(atob(token.split('.')[1])) as AppToken;

      this.#userService.token.set(token);

      this.#userService.user.set(decoded_token);
      this.router.navigate(['', 'diary']);
      // const decoded_token= JSON.parse()
    })
  }

  goToSignUp() {
    // this.router.
  }
}
