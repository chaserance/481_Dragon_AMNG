import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgramService} from '../../../../../shared/services/program.service';
import {Program} from '../../../../../model/program';
import {CourseService} from '../../../../../shared/services/course.service';
import {LocalDataSource} from 'ng2-smart-table';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      courseName: {
        title: 'Course Name',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a>${cell}</a>`;
        },
      },
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
    private route: ActivatedRoute,
    private programService: ProgramService,
    private courseService: CourseService,
    private router: Router,
    private location: Location
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

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/profile/registration/course/' + window.btoa(link)]);
  }
}
