import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CCTV';
  h1 = '';

  route: any;
  constructor(
    location: Location,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
      } else {
        this.route = 'index';
      }
    });
  }


}
