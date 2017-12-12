import { Component, OnInit, Input } from '@angular/core';
import {Session} from '../../../../model/session';
import {Child} from '../../../../model/child';
import {Performance} from '../../../../model/performance';
import {PerformanceService} from '../../../../shared/services/performance.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() session: Session;
  @Input() student: Child;
  @Input() performance: Performance;

  constructor(private performanceService: PerformanceService) { }

  ngOnInit() {
  }

  onSave(): void {
    this.performanceService.updatePerformance(this.performance)
      .subscribe();
  }

}
