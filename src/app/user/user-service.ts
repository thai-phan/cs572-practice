import {effect, inject, Injectable, signal} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Initial_State, Token} from "../types";


@Injectable({
  providedIn: "root"
})
export class UserService {
  #http = inject(HttpClient)


  constructor() {

    effect(() => {
      localStorage.setItem('token', this.token())
      localStorage.setItem('user', JSON.stringify(this.user()))
    });
  }

  token = signal('')
  user = signal<Token>(Initial_State)

  signIn(data: Partial<{ email: string, password: string; }>) {
    console.log(data)
    return this.#http.post(environment.BACKEND_URL + "/user/sign-in", data)
  }


  signUp(data: FormData) {
    return this.#http.post(environment.BACKEND_URL + "/user/sign-up", data)
  }

  isLoggedIn(): boolean {
    return this.token() !== '';
  }

}