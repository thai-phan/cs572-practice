import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  template: `
    <p>
      This is home works!
    </p>
    <p>
      <a [routerLink]="['/sign-in']">Sign in</a>
    </p>
    
  `,
  styles: ``
})
export class Home {
  // get time parameter from the url
  // protected time = this.router.getCurrentNavigation()?.extras.queryParams?.time;

  protected routers = inject(Router)
}
