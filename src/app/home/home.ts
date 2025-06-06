import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <p>
      home works!
    </p>
<!--    <button (click)="routers.navigate(['', 'home'])"></button>-->
    
  `,
  styles: ``
})
export class Home {
  // get time parameter from the url
  // protected time = this.routers.getCurrentNavigation()?.extras.queryParams?.time;

  protected routers = inject(Router)
}
