import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "./user-service";

@Component({
  selector: 'app-users',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,

  ],
  template: `
    <h1>Sign Up</h1>
    <p>
      <a [routerLink]="['', 'signIn']">Back to Sign in</a>
    </p>
    <form (ngSubmit)="submit()">
      <input placeholder="fullname" [formControl]="fullName">
      <input placeholder="email" [formControl]="email">
      <input placeholder="password" type="password" [formControl]="password">
      <input placeholder="profile picture" type="file" (change)="access_file($event)">
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: ``
})
export class SignUp {
  file!: File;
  #userService = inject(UserService)
  routers = inject(Router)

  form = inject(FormBuilder).nonNullable.group({
    fullName: ['thai', Validators.required],
    email: ['thai@gmail.com', Validators.required],
    password: ['123456546', Validators.required],
  })

  get fullName() {
    return this.form.controls.fullName
  }

  get email() {
    return this.form.controls.email
  }

  get password() {
    return this.form.controls.password
  }

  access_file(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) {
      this.file = input.files![0];
    }
  }

  submit() {
    console.log(this.file)
    console.log(this.form.value)
    const data = new FormData();

    data.append('fullName', this.fullName.value)
    data.append('email', this.email.value)
    data.append('password', this.password.value)
    data.append('profile_picture', this.file)

    this.#userService.signUp(data).subscribe(res => {
      console.log("data")
      // this.routers.navigate(['signIn']);
    })
  }
}
