import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {PerformanceService} from '../../../../../../shared/services/performance.service';
import {UserService} from '../../../../../../shared/services/user.service';
import {ChildService} from '../../../../../../shared/services/child.service';
import {User} from '../../../../../../model/user';
import {Child} from '../../../../../../model/child';
import {Session} from '../../../../../../model/session';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-button-render',
  templateUrl: './button-render.component.html',
  styleUrls: ['./button-render.component.scss']
})
export class ButtonRenderComponent implements OnInit {

  public session: Session;

  user: User;
  children: Child[];
  selectedChild: Child;

  modalRef: BsModalRef;

  @Input() value;
  constructor(private performanceService: PerformanceService,
              private userService: UserService,
              private childService: ChildService,
              private modelService: BsModalService) { }

  ngOnInit() {
    this.session = this.value;
    this.getUser();
  }

  getUser() {
    this.userService.getMe()
      .subscribe(u => {
        this.user = u;
        this.childService.getChildrenByUser(u)
          .subscribe(cs => this.children = cs._embedded.result_array);
      });
  }

  onClick(template: TemplateRef<any>) {
    this.modalRef = this.modelService.show(template);
  }

  onSubmit() {
    this.modalRef.hide();
    if (this.selectedChild) {
      this.performanceService.addPerformance(this.selectedChild, this.session)
        .subscribe(_ => alert('success!'));
    }
  }

}
