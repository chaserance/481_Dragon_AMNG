import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../../../../../model/user';
import {UserService} from '../../../../../shared/services/user.service';
import {RoleService} from '../../../../../shared/services/role.service';
import {Role} from '../../../../../model/role';
import {State} from '../../../../../model/state';
import {BillService} from '../../../../../shared/services/bill.service';
import {Bill} from '../../../../../model/bill';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User;
  allRoles: Role[];

  states = State;

  bill: Bill;

  stateKeys(): Array<string> {
    const keys = Object.keys(this.states);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getRoles() {
    this.roleService.getRoles()
      .subscribe(r => {
        this.allRoles = r._embedded.result_array;
        this.roleService.getRolesByUser(this.user)
          .subscribe(rList => {
            rList._embedded.result_array.forEach(ur => {
              this.allRoles.forEach(al => {
                if (ur.name === al.name) {
                  al.checked = true;
                }
              });
            });
          });
      });
  }

  private getBill() {
    this.billService.getBillByUser(this.user)
      .subscribe(b => this.bill = b,
        e => {
          const newBill = new Bill();
          newBill.amount = 0;
          newBill.discount = 0;
          newBill.billPeriod = {
            startDate: new Date(),
            endDate: new Date()
          };
          this.billService.addBill(newBill)
            .subscribe(b => {
              this.userService.updateUser(this.user, b._links.self.href)
                .subscribe(__ => this.getUser());
            });
        });
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getEntityByUrl(id)
      .subscribe(user => {
        this.user = user;
        this.getRoles();
        this.getBill();
      });
  }

  onSave(): void {
    this.userService.updateUser(this.user)
      .subscribe(_ => {

        this.billService.updateBill(this.bill)
          .subscribe();

        let urlList = '';
        this.allRoles.forEach(r => {
          if (r.checked) {
            urlList += r._links.self.href + '\n';
          }
        });
        this.userService.updateUser(this.user, urlList)
          .subscribe(o => this.getUser());
      });

  }

  goBack(): void {
    this.location.back();
  }
}
