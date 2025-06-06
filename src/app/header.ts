

// angular router outlet
import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a [routerLink]="['', 'home']" >Home</a>
      <a [routerLink]="['', 'about']">About</a>
      <a [routerLink]="['', 'users']">Contact</a>
    </nav>
  `,
  styles: `nav a {margin-right: 10px;}`,

  standalone: true
})

export class Header {

}