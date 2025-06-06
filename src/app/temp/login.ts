import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  PristineChangeEvent,
  ReactiveFormsModule, StatusChangeEvent, TouchedChangeEvent,
  Validators, ValueChangeEvent
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="handle()">
      <input placeholder="email" [formControl]="email"/>
      @if (email.invalid && (email.dirty || email.touched)) {
        @if (email.hasError('required')) {
          <span>Email is required</span>
        }
        @if (email.hasError('email')) {
          <span>Invalid email format</span>
        }
        @if (email.hasError('emailExists')) {
          <span>Email already exists</span>
        }
      }
      <input placeholder="password" [formControl]="password"/>
      @if (password.hasError("notOneToEight")) {
        <span>Password cannot be "12345678"</span>
      }
      <!--      @else if(password.invalid && (password.dirty || password.touched)) {-->
      <!--        @if(password.hasError('required')) {-->
      <!--          <span>Password is required</span>-->
      <!--        } @else if(password.hasError('minlength')) {-->
      <!--          <span>Password must be at least 6 characters long</span>-->
      <!--        }-->
      <!--      }-->
      <button type="submit">Submit</button>
    </form>
    <!--    -->
    <!--    <mat-toolbar color="primary">-->
    <!--      <span>Login</span>-->
    <!--    </mat-toolbar>-->
    <!--    <mat-card>-->
    <!--      <form (ngSubmit)="login()">-->
    <!--        <mat-form-field appearance="fill">-->
    <!--          <mat-label>Username</mat-label>-->
    <!--          <input matInput [formControl]="usernameControl" required>-->
    <!--        </mat-form-field>-->
    <!--        <button mat-raised-button color="primary" type="submit">Login</button>-->
    <!--      </form>-->
    <!--    </mat-card>-->
  `,
  styles: []
})

export class LoginComponent {
  form = inject(FormBuilder).group({
    // email: ["", [Validators.required, Validators.email]],
    email: ["", {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailFormServer],
      updateOn: 'blur'
    }],
    password: ["", {
      validators: [Validators.required, Validators.minLength(6), this.notOneToEight],
      updateOn: 'blur'
    }]
  })

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  constructor() {
    // this.form.controls.email.patchValue("thai@mail.com");

    // this.form.controls.email.valueChanges.subscribe(value => {
    //   console.log("Email changed:", value);
    // });

    this.form.events.subscribe(e => {
      console.log(e)
      if (e instanceof StatusChangeEvent) {
        console.log(e.status)
      }
      if (e instanceof ValueChangeEvent) {
        console.log(e.value)
      }
      if (e instanceof PristineChangeEvent) {
        console.log(e.pristine)
      }
      if (e instanceof TouchedChangeEvent) {
        console.log(e.touched)
      }


      // console.log(event)
      // if (event.source) {
      //   console.log("Form is valid");
      // }
      // if (value === 'INVALID') {
      //   console.log("Form is invalid");
      // }
    })
  }

  // ngOnInit() {
  //   this.form.events.subscribe(event => {
  //     if (event instanceof StatusEvent) {
  //       console.log(event.status);
  //     }
  //     if (event instanceof ValueChangeEvent) {
  //       console.log(event.value);
  //     }
  //     if (event instanceof PristineEvent) {
  //       console.log(event.pristine);
  //     }
  //     if (event instanceof TouchedEvent) {
  //       console.log(event.touched);
  //     }
  //   });
  // }


  handle() {
    console.log(this.form.value);

  }

  notOneToEight(control: AbstractControl) {
    if (control.value === "12345678") {
      return {notOneToEight: true};
    } else {
      return null;
    }
  }

  checkEmailFormServer(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      if (control.value === "neng@mail.com") {
        setTimeout(() => {
          resolve({emailExists: true});
        }, 2000)
      } else {
        setTimeout(() => {
          resolve(null);
        })
      }
    })
  }

  //
  // private router = inject(Router);
  // private dataservice = inject(ProductService);
  // private snackBar = inject(MatSnackBar);
  // private title = inject(Title);
  //
  // usernameControl = new FormControl('');
  //
  // constructor() {
  //   this.title.setTitle('Login Page');
  // }
  //
  // login() {
  //   const username = this.usernameControl.value;
  //   if (username) {
  //     this.dataservice.signin(username);
  //     this.router.navigate(['/']);
  //   } else {
  //     this.snackBar.open('Please enter a username', 'Close', { duration: 2000 });
  //   }
  // }
}