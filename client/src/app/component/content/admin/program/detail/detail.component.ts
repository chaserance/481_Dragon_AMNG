import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgramService} from '../../../../../shared/services/program.service';
import {Program} from '../../../../../model/program';
import {CourseService} from '../../../../../shared/services/course.service';
import {Location} from '@angular/common';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

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
      courseName: {
        title: 'Course Name',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a>${cell}</a>`;
        },
      },
      enabled: {
        title: 'Enabled',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: true, title: 'true'},
              { value: false, title: 'false'}
            ]
          }
        }
      }
    },
    noDataMessage: 'Cannot find match course',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  program: Program;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private programService: ProgramService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProgram();
  }

  private getCourses() {
    this.courseService.getCoursesByProgram(this.program)
      .subscribe(cList => {
        this.source.load(cList._embedded.result_array);
      });
  }

  getProgram(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.programService.getEntityByUrl(id)
      .subscribe(program => {
        this.program = program;
        this.getCourses();
      });
  }

  onSave(): void {
    console.log(this.program);
    this.programService.updateProgram(this.program)
      .subscribe(_ => this.getProgram());
  }

  goBack(): void {
    this.location.back();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.courseService.deleteCourse(event.data)
        .subscribe(_ => this.getCourses());
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      this.courseService.addCourse(event.newData, this.program)
        .subscribe(_ => this.getCourses());
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/admin/programs/course/' + window.btoa(link)]);
  }
}
