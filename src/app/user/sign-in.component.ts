import {Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Token,} from "@angular/compiler";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";

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

  `,
  styles: ``
})

export class SignIn {
  router = inject(HttpClient)
  #userService = inject(UserService)

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  // token = signal('')
  // user = signal<Token>(Init)

  submit() {

    this.#userService.signIn(this.form.value).subscribe((res: any) => {
      console.log(res);
      const token = res.data.token;

      // const decoded_token= JSON.parse()
    })
  }
}
