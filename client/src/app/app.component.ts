import {AfterViewInit, Component} from '@angular/core';
import { routerTransition } from './animation/router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    document.getElementById('global-spinner').style.display = 'none';
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
