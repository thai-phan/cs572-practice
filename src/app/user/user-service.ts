import {effect, inject, Injectable, signal} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Initial_State, StandardResponse, AppToken} from "../types";
import {catchError, Observable, throwError} from "rxjs";


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
  user = signal<AppToken>(Initial_State)

  signIn(data: Partial<{ email: string, password: string; }>) {
    console.log(data)
    return this.#http.post<StandardResponse<{ token: string; }>>(environment.BACKEND_URL + "/user/sign-in", data)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(`An error occurred: ${error.error}`)
      // console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alert(`Backend returned code ${error.status}, body was:  ${error.error}`)

      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  signUp(data: FormData): Observable<Object> {
    return this.#http.post(environment.BACKEND_URL + "/user/sign-up", data).pipe(catchError(this.handleError))
  }

  isLoggedIn(): boolean {
    return this.token() !== '';
  }

}