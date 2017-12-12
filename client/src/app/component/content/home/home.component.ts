import { Component, OnInit } from '@angular/core';
import { homeTransition } from '../../../animation/home.animation';
import {ProgramService} from '../../../shared/services/program.service';
import {Program} from '../../../model/program';
import {Promotion} from '../../../model/promotion';
import {Pageable} from '../../../model/pageable';
import {PromotionService} from '../../../shared/services/promotion.service';

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
  programs: Program[];
  promotions: Promotion[];
  events: any[] = EVENTS;
  private n = 4;

  constructor(private programService: ProgramService,
              private promotionService: PromotionService) { }

  ngOnInit() {
    this.getFirstNPrograms();
    this.getFirstNPromotions();
  }

  getFirstNPrograms() {
    const pageable = new Pageable();
    pageable.size = this.n;
    this.programService.getPrograms(pageable)
      .subscribe(p => this.programs = p._embedded.result_array);
  }

  getFirstNPromotions() {
    const pageable = new Pageable();
    pageable.size = this.n;
    this.promotionService.getPromotions(pageable)
      .subscribe(p => this.promotions = p._embedded.result_array);
  }

}

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
