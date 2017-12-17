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
      programName: {
        title: 'Program Name',
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
    noDataMessage: 'Cannot find match program',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('md')
  modal: any;

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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.programService.deleteProgram(event.data)
        .subscribe(_ => this.getAllPrograms());
    } else {
      console.log('delete - else');
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      console.log(event.newData);
      this.programService.addProgram(event.newData)
        .subscribe(_ => this.getAllPrograms());
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/admin/programs/detail/' + window.btoa(link)]);
  }
}
