import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animation/router.animation';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  animations: [routerTransition]
})
export class ProgramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
