import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Course} from '../../../../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../../../shared/services/course.service';
import {SessionService} from '../../../../../shared/services/session.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  settings = {
    actions: {
      edit: false
    },
    add: {
      addButtonContent: '<i class="btn btn-primary">Add</i>',
      createButtonContent: '<i class="btn btn-success">Save</i>',
      cancelButtonContent: '<i class="btn btn-warning">Cancel</i>',
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-fw fa-trash-o"></i>',
      confirmDelete: true,
    },
    columns: {
      sessionName: {
        title: 'Session Name',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a>${cell}</a>`;
        },
      },
    },
    noDataMessage: 'Cannot find match session',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  course: Course;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sessionService: SessionService,
    private router: Router
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

  onSave(): void {
    this.courseService.updateCourse(this.course)
      .subscribe(_ => this.getCourse());
  }

  goBack(): void {
    this.location.back();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.sessionService.deleteSession(event.data)
        .subscribe(_ => this.getSessions());
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      this.sessionService.addSession(event.newData, this.course)
        .subscribe(_ => this.getSessions());
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/admin/programs/session/' + window.btoa(link)]);
  }

}
