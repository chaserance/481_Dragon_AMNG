import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {UserService} from '../../../../../shared/services/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  settings = {
    actions: {
      add: false
    },
    edit: {
      editButtonContent: '<i class="fa fa-fw fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-fw fa-save"></i>',
      cancelButtonContent: '<i class="fa fa-fw fa-undo"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-fw fa-trash-o"></i>',
      confirmDelete: true,
    },
    columns: {
      firstname: {
        title: 'First Name',
        type: 'text',
      },
      lastname: {
        title: 'First Name',
        type: 'text',
      },
      username: {
        title: 'Email',
        type: 'text'
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'text'
      },
      registrationDate: {
        title: 'Registration Date',
        type: 'text',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'MM/dd/yyyy');
        }
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
    noDataMessage: 'Cannot find match user',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private userService: UserService,
              private router: Router,
              private datePipe: DatePipe) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe(arr => {
        this.source.load(arr._embedded.result_array);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.userService.deleteUser(event.data)
        .subscribe(_ => this.getAllUsers());
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/admin/users/detail/' + window.btoa(link)]);
  }
}
