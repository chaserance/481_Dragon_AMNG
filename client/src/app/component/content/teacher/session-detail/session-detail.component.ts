import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SessionService } from '../../../../shared/services/session.service';
import {Session} from '../../../../model/session';
import {Performance} from '../../../../model/performance';
import {PerformanceService} from '../../../../shared/services/performance.service';
import {ChildService} from '../../../../shared/services/child.service';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../../../model/pageable-results';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  @Input() session: Session;
  @Input() performancesObs: Observable<PageableResults<Performance>>;
  performances: Performance[];

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private location: Location,
    private childService: ChildService,
    private performanceService: PerformanceService
  ) { }

  ngOnInit(): void {
    this.getPerformances();
  }

  getPerformances() {
    this.performances = null;
    this.performancesObs.subscribe(result => {
      this.performances = result._embedded.result_array;
      this.performances.forEach(p =>
        this.getChildByPerformance(p).subscribe(c => p.child = c)
      );
    });
  }

  getChildByPerformance(performance: Performance) {
    return this.childService.getChildByPerformance(performance);
  }

  onSave(performance: Performance): void {
    this.performanceService.updatePerformance(performance)
      .subscribe(_ => this.getPerformances());
  }
}
