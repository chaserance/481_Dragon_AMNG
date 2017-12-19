import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Course} from '../../../../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../../../shared/services/course.service';
import {SessionService} from '../../../../../shared/services/session.service';
import {DatePipe, Location} from '@angular/common';
import {ButtonRenderComponent} from './button-render/button-render.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      sessionName: {
        title: 'Session Name',
        type: 'text',
      },
      sessionDescription: {
        title: 'Description',
        type: 'text',
      },
      period: {
        title: 'Period',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          const start = this.getDateString(cell.startDate);
          const end = this.getDateString(cell.endDate);
          return `<b>Start: ${start}</b><br/>
                  <b>End: ${end}</b>`;
        },
      },
      schedule: {
        title: 'Schedule',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          const days = this.getDaysString(cell.days);
          const startT = this.getTimeString(cell.startTime);
          const endT = this.getTimeString(cell.endTime);
          return `<b>Days: ${days}</b><br/>
                  <b>From: ${startT}</b><br/>
                  <b>To: ${endT}</b>`;
        },
      },
      button: {
        title: 'Action',
        type: 'custom',
        renderComponent: ButtonRenderComponent,
        valuePrepareFunction: (cell, row) => {
          return row;
        },
      }
    },
    noDataMessage: 'Cannot find match session',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  course: Course;

  daysKey = 'MTWRFSU';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sessionService: SessionService,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  private getSessions() {
    this.sessionService.getSessionsByCourse(this.course)
      .subscribe(cList => {
        this.source.load(cList._embedded.result_array);
      });
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getEntityByUrl(id)
      .subscribe(course => {
        this.course = course;
        this.getSessions();
      });
  }

  private getDateString(date: Date): string {
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  private getTimeString(date: Date): string {
    return new Date(date).toTimeString().substr(0, 8);
  }

  private getDaysString(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) !== '_') {
        result += this.daysKey.charAt(i);
        result += ',';
      }
    }
    return result;
  }

}
