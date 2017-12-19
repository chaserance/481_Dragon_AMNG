import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';
import {State} from '../../../../model/state';
import {Bill} from '../../../../model/bill';
import {UserService} from '../../../../shared/services/user.service';
import {BillService} from '../../../../shared/services/bill.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: User;

  states = State;

  bill: Bill;

  stateKeys(): Array<string> {
    const keys = Object.keys(this.states);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private userService: UserService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  // private getBill() {
  //   this.billService.getBillByUser(this.user)
  //     .subscribe(b => this.bill = b,
  //       e => {
  //         const newBill = new Bill();
  //         newBill.amount = 0;
  //         newBill.discount = 0;
  //         newBill.billPeriod = {
  //           startDate: new Date(),
  //           endDate: new Date()
  //         };
  //         this.billService.addBill(newBill)
  //           .subscribe(b => {
  //             this.userService.updateUser(this.user, b._links.self.href)
  //               .subscribe(__ => this.getUser());
  //           });
  //       });
  // }

  getUser(): void {
    this.userService.getMe()
      .subscribe(u => this.user = u);
  }

  onSave(): void {
    this.userService.updateUser(this.user)
      .subscribe();

  }
}
