import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() message: string;
  @Input() yesMsg: string;
  @Input() noMsg: string;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(private modalService: BsModalService) { }


  modalRef: BsModalRef;

  @ViewChild('modal')
  template: TemplateRef<any>;

  ngOnInit() {
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
  }

  check(isConfirm: boolean): void {
    if (isConfirm) {
      this.confirm.emit(isConfirm);
    } else {
      this.cancel.emit(isConfirm);
    }
    this.modalRef.hide();
  }

}
