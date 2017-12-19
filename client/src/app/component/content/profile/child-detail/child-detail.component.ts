import { Component, OnInit } from '@angular/core';
import {Child} from '../../../../model/child';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ChildService} from '../../../../shared/services/child.service';
import {Performance} from '../../../../model/performance';
import {PerformanceService} from '../../../../shared/services/performance.service';
import {CourseService} from '../../../../shared/services/course.service';
import {ProgramService} from '../../../../shared/services/program.service';
import {SessionService} from '../../../../shared/services/session.service';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.scss']
})
export class ChildDetailComponent implements OnInit {

  child: Child;
  performances: Performance[];
  sessionReady = false;

  constructor(
    private location: Location,
    private childService: ChildService,
    private performanceService: PerformanceService,
    private sessionService: SessionService,
    private courseService: CourseService,
    private programService: ProgramService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getChild();
  }

  getChild(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.childService.getEntityByUrl(id)
      .subscribe(c => {
        this.child = c;
        this.getPerformances();
      });
  }

  private getPerformances() {
    this.performanceService.getSessionsByChild(this.child)
      .subscribe(ps => {
        this.performances = ps._embedded.result_array;
        this.performances.forEach(pf => {
          this.sessionService.getEntityByUrl(pf._links.session.href, true)
            .subscribe(s => {
              pf.session = s;
              this.courseService.getEntityByUrl(s._links.course.href, true)
                .subscribe(c => {
                  s.course = c;
                  this.programService.getEntityByUrl(c._links.program.href, true)
                    .subscribe(p => {
                      c.program = p;
                      this.sessionReady = true;
                    });
                });
              }
            );
        });
      });
  }

  onSave(): void {
    this.childService.updateChild(this.child)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  onDrop(p: Performance) {
    this.sessionReady = false;
    this.performanceService.deletePerformance(p)
      .subscribe(_ => this.getChild());
  }

}
