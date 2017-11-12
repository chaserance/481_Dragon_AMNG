import { Component, OnInit } from '@angular/core';
import { homeTransition } from '../../../animation/home.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ homeTransition ],
  host: {
    '[@homeTransition]': ''
  }
})
export class HomeComponent implements OnInit {
  courses: any[] = COURSES;
  promotions: any[] = PROMOTIONS;
  events: any[] = EVENTS;

  constructor() { }

  ngOnInit() {
  }

}

const COURSES = [
  {
    name: 'Course A',
    description: 'Some description about course A.'
  },
  {
    name: 'Course B',
    description: 'Some description about course B.'
  },
  {
    name: 'Course C',
    description: 'Some description about course C.'
  },
  {
    name: 'Course D',
    description: 'Some description about course D.'
  },
  {
    name: 'Course E',
    description: 'Some description about course E.'
  }
];
const PROMOTIONS = [
  {
    name: 'Multiple enrollment promotions',
    description: 'Some description about Multiple enrollment promotions.'
  },
  {
    name: 'Seasonal promotions',
    description: 'Some description about Seasonal promotions.'
  },
  {
    name: 'Multi programs promotions',
    description: 'Some description about Multi programs promotions.'
  }
];
const EVENTS = [
  {
    name: 'Event A',
    time: '08/08/2017',
    description: 'Some description about Event A.'
  },
  {
    name: 'Event B',
    time: '09/09/2017',
    description: 'Some description about Event B.'
  },
  {
    name: 'Event C',
    time: '10/10/2017',
    description: 'Some description about Event C.'
  }
];
