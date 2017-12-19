import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Child} from '../../../../model/child';
import {User} from '../../../../model/user';
import {LocalDataSource} from 'ng2-smart-table';
import {ChildService} from '../../../../shared/services/child.service';
import {DatePipe, Location} from '@angular/common';
import {Gender} from '../../../../model/gender';
import {BsDatepickerComponent} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="btn btn-primary">Add</i>',
      createButtonContent: '<i class="btn btn-success">Save</i>',
      cancelButtonContent: '<i class="btn btn-warning">Cancel</i>',
      confirmCreate: true
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
        title: 'Last Name',
        type: 'text',
      },
      gender: {
        title: 'gender',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: Gender.MALE, title: 'Male'},
              { value: Gender.FEMALE, title: 'Female'}
            ]
          }
        }
      },
    },
    noDataMessage: 'Cannot find match child',
    pager: {
      display: true,
      perPage: 5
    }
  };

  source: LocalDataSource = new LocalDataSource();

  user: User;

  @Input('_user')
  set _user(value: User) {
    this.user = value;
    if (this.user) {
      this.getAllChildren();
    }
  }

  constructor(private childService: ChildService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
  }

  getAllChildren() {
    this.childService.getChildrenByUser(this.user)
      .subscribe(arr => {
        this.source.load(arr._embedded.result_array);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.childService.deleteChild(event.data)
        .subscribe(_ => this.getAllChildren());
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      this.childService.addChild(event.newData, this.user)
        .subscribe(_ => this.getAllChildren());
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event) {
    const link = event.data._links.self.href;
    this.router.navigate(['/profile/children/' + window.btoa(link)]);
  }

  goBack(): void {
    this.location.back();
  }

}
