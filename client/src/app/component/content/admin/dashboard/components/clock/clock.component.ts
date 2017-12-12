import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent  implements OnInit {

  constructor() { }

  now = '000000';

  ngOnInit() {
    const timeoutId = setInterval(() => {
      const time = new Date();
      this.now = ('0' + time.getHours()).substr(-2) + ('0' + time.getMinutes()).substr(-2) + ('0' + time.getSeconds()).substr(-2);
    }, 1000);
  }

}
