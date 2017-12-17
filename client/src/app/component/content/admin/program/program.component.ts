import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animation/router.animation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  animations: [routerTransition]
})
export class ProgramComponent implements OnInit {

  courseKey = 'admin/programs/course';
  sessionKey = 'admin/programs/session';
  detailKey = 'admin/programs/detail';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get heading(): string {
    const curUrl = this.router.url;
    if (curUrl.indexOf(this.detailKey) !== -1) {
      return 'Program';
    } else if (curUrl.indexOf(this.courseKey) !== -1) {
      return 'Course';
    } else if (curUrl.indexOf(this.sessionKey) !== -1) {
      return 'Session';
    } else {
      return 'Programs';
    }
  }

  get icon(): string {
    const curUrl = this.router.url;
    if (curUrl.indexOf(this.detailKey) !== -1) {
      return 'fa-mortar-board';
    } else if (curUrl.indexOf(this.courseKey) !== -1) {
      return 'fa-language';
    } else if (curUrl.indexOf(this.sessionKey) !== -1) {
      return 'fa-th-list';
    } else {
      return 'fa-mortar-board';
    }
  }
}
