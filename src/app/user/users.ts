import {Component, signal} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users',
  imports: [
    RouterLink
  ],
  template: `
    <p>
      users works!
    </p>
    <ul>
      @for (user of users(); track user.id) {
        <li>{{ user.name }}</li>
        <a [routerLink]="['', 'users', user.id]">{{ user.name }}</a>
      }
    </ul>
  `,
  styles: ``
})
export class Users {
  users = signal([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' }
  ])
}
