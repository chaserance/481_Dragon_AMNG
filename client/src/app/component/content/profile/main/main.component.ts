import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';
import {UserService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMe()
      .subscribe(u => this.user = u);
  }

}
