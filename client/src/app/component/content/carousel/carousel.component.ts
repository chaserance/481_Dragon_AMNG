import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [{provide: CarouselConfig, useValue: {interval: 4000, noPause: true}}]
})
export class CarouselComponent implements OnInit {

  introductions = INTRODUCTIONS;

  constructor() {
  }

  ngOnInit() {
  }
}

const INTRODUCTIONS = [
  {
    name: 'Introduction A with Sample Picture from Internet',
    description: 'Something to explain in detail.'
  },
  {
    name: 'Introduction B with Sample Picture from Internet',
    description: 'Other thing to explain in detail.'
  },
  {
    name: 'Introduction C with Sample Picture from Internet',
    description: 'Yeah, explain again.'
  }
];
