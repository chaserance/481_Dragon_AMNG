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

  session: Session;
  performances: Performance[];

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private location: Location,
    private childService: ChildService,
    private performanceService: PerformanceService
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  private getPerformances() {
    this.performanceService.getChildrenBySession(this.session)
      .subscribe(pList => {
        this.performances = pList._embedded.result_array;
        this.performances.forEach(p =>
          this.childService.getChildByPerformance(p).subscribe(c => p.child = c)
        );
      });
  }

  getSession(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.sessionService.getEntityByUrl(id)
      .subscribe(session => {
        this.session = session;
        this.getPerformances();
      });
  }

  onSave(performance: Performance): void {
    console.log(performance);
    this.performanceService.updatePerformance(performance)
      .subscribe(_ => this.getPerformances());
  }

  goBack(): void {
     this.location.back();
  }
}

// import { Component, OnInit, Input } from '@angular/core';
//
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import {SessionService} from '../../../../shared/services/session.service';
// import {Session} from '../../../../model/session';
// import {Child} from '../../../../model/child';
//
//
// @Component({
//   selector: 'app-session-detail',
//   templateUrl: './session-detail.component.html',
//   styleUrls: ['./session-detail.component.css']
// })
// export class SessionDetailComponent implements OnInit {
//
//   @Input() session: Session;
//   selectedStudent: Child;
//
//   onSelectStudent(student: Child): void {
//     this.selectedStudent = student;
//   }
//
//   constructor(
//     private route: ActivatedRoute,
//     private sessionService: SessionService,
//     private location: Location
//   ) { }
//
//   ngOnInit(): void {
//     this.getSession();
//   }
//
//   getSession(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.sessionService.getEntityByUrl(id)
//       .subscribe(session => this.session = session);
//   }
//
//   goBack(): void {
//     this.location.back();
//   }
// }
