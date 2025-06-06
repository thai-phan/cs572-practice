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
      <a [routerLink]="['', 'signin']">Back to Sign in</a>
    </p>
    <form (ngSubmit)="submit()">
      <input placeholder="fullname" [formControl]="fullname">
      <input placeholder="email" [formControl]="email">
      <input placeholder="password" type="password" [formControl]="password">
      <input placeholder="profile picture" type="file" (change)="access_file($event)">
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: ``
})
export class Signup {
  file!: File;
  #userService = inject(UserService)
  routers = inject(Router)

  form = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    file: ['']

  })

  get fullname() {
    return this.form.controls.fullname
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
    data.append('fullname', this.fullname.value)
    data.append('email', this.email.value)
    data.append('password', this.password.value)
    data.append('profile_picture', this.file)

    this.#userService.signup(data).subscribe(res => {
      console.log("data")
      this.routers.navigate(['signin']);
    })
  }
}
