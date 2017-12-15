import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import {BsModalService, ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalService,
  ],
  declarations: [ConfirmModalComponent],
  exports: [
    ConfirmModalComponent
  ],
})
export class ConfirmModalModule { }
