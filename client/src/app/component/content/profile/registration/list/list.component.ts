import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProgramService} from '../../../../../shared/services/program.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  settings = {
    actions: false,
    columns: {
      programName: {
        title: 'Program Name',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a>${cell}</a>`;
        },
      },
    },
    noDataMessage: 'Cannot find match program',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private programService: ProgramService,
              private router: Router) {
    this.getAllPrograms();
  }

  getAllPrograms() {
    this.programService.getPrograms()
      .subscribe(arr => {
        this.source.load(arr._embedded.result_array);
      });
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/profile/registration/program-detail/' + window.btoa(link)]);
  }
}
