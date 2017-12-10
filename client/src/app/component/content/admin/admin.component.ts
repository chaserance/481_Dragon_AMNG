import { Component, OnInit } from '@angular/core';
import {ProgramService} from '../../../service/program.service';
import {Program} from '../../../model/program';
import {CourseService} from '../../../service/course.service';
import {Course} from '../../../model/course';
import {Pageable} from '../../../model/pageable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  programs: Program[] = [];

  constructor(private programService: ProgramService,
              private courseService: CourseService) { }

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms(): void {
    // const p = new Pageable(1, 2);
    this.programService.getPrograms()
      .subscribe(programs => {
        this.programs = programs._embedded.result_array;
        this.getCoursesByProgram();
      });
  }

  getCoursesByProgram(): void {
    for (let i = 0; i < this.programs.length; i++) {
      this.courseService.getCoursesByProgram(this.programs[i])
        .subscribe(courses => this.programs[i].courses = courses._embedded.result_array);
    }
  }

  updateCourse(course: Course): void {
    this.courseService.updateCourse(course, 'http://localhost:8082/api/programs/3')
      .subscribe(_ => this.getPrograms());
  }
}
