import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animation/router.animation';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: [routerTransition]
})
export class UserManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
