import {Routes} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "./user/user-service";
import {SignIn} from "./user/sign-in.component";
import {SignUp} from "./user/sign-up.component";
import {Diary} from "./diary/diary";


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadComponent: () => import("./home/home").then(c => c.Home),
    // component: Home, // use this if you want to load the component eagerly
  },
  {
    path: 'sign-in', component: SignIn
  },
  {
    path: 'sign-up', component: SignUp
  },
  {
    path: 'diary', component: Diary,
    canActivate: [() =>  inject(UserService).isLoggedIn()]
  },
  {
    path: '**', redirectTo: 'home'
  }
];

export default routes