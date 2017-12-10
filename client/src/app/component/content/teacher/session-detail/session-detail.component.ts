import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../session';
import { Student } from '../student';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SessionService } from '../../../../service/session.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  @Input() session: Session;
  selectedStudent: Student;

  onSelectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sessionService.getSession(id)
      .subscribe(session => this.session = session);
  }

  goBack(): void {
    this.location.back();
  }
}
