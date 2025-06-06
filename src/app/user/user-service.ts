import {effect, inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface Token {

}
let Initial_State: Token = {

}
@Injectable({
  providedIn: "root"
})
export  class UserService {
  #http = inject(HttpClient)


  constructor() {

    effect(() => {
      localStorage.setItem('token', this.token())
      localStorage.setItem('user', JSON.stringify(this.user()))
    });
  }

  token = signal('')
  user = signal<Token>(Initial_State)

  signin(data: FormData) {
    return this.#http.post(this.environment + "/signup", {
      data
    })
  }

  environment = "http://localhost:3000"

  signup(data: FormData) {
    return this.#http.post(this.environment + "/signup", {
      data
    })
  }

  isLoggedIn(): boolean {
    return this.token() !== '';
  }

}