import { Component } from '@angular/core';
import {ProgramService} from '../../../../../shared/services/program.service';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class EditableTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="btn btn-primary">Add</i>',
      createButtonContent: '<i class="btn btn-warning">Save</i>',
      cancelButtonContent: '<i class="btn btn-danger">Cancel</i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="fa fa-fw fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-fw fa-save"></i>',
      cancelButtonContent: '<i class="btn btn-danger">Cancel</i>',
      confirmEdit: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-fw fa-trash-o"></i>',
      confirmDelete: true,
    },
    columns: {
      programName: {
        title: 'Name',
        type: 'string',
      },
      programDescription: {
        title: 'Description',
        type: 'string',
      },
      enabled: {
        title: 'Enabled',
        type: 'boolean',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource()

  constructor(private programService: ProgramService) {
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
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    console.log('Save.......');
    if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
      this.programService.updateProgram(event.data)
        .subscribe(_ => this.getAllPrograms());
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log('Create.......');
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['enabled'] = true;
      event.confirm.resolve(event.newData);
      console.log(event.newData);
      this.programService.addProgram(event.newData)
        .subscribe(_ => this.getAllPrograms());
    } else {
      event.confirm.reject();
    }
  }
}
