import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {PromotionService} from '../../../../shared/services/promotion.service';
import {routerTransition} from '../../../../animation/router.animation';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  animations: [routerTransition]
})
export class PromotionComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="btn btn-primary">Add</i>',
      createButtonContent: '<i class="btn btn-warning">Save</i>',
      cancelButtonContent: '<i class="fa fa-fw fa-undo"></i>',
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
      name: {
        title: 'Name',
        type: 'text',
      },
      description: {
        title: 'Description',
        type: 'text',
      },
      ratio: {
        title: 'Ratio',
        type: 'text',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private promotionService: PromotionService) {
  }

  ngOnInit() {
    this.getAllPromotions();
  }

  getAllPromotions() {
    this.promotionService.getPromotions()
      .subscribe(arr => {
        this.source.load(arr._embedded.result_array);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.promotionService.deletePromotion(event.data)
        .subscribe(_ => this.getAllPromotions());
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      this.promotionService.updatePromotion(event.newData)
        .subscribe(_ => this.getAllPromotions());
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log('Create.......');
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
      this.promotionService.addPromotion(event.newData)
        .subscribe(_ => this.getAllPromotions());
    } else {
      event.confirm.reject();
    }
  }
}
