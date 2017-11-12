import { Component } from '@angular/core';
import { routerTransition } from './animation/router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent {
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
