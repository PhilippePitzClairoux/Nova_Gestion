import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router) {
  }

  public getClass(): string {
    if (this.router.url === '/authentification') {
      return 'page-content';
    } else {
      return 'page-content-menu';
    }
  }

}
