import { Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed = false;

  isScrollDown = false;

  buffer = 50;

  state = 'active';

  constructor(
    private userService: UserService,
    public auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  clickToggler(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  @HostListener('window:load', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    if (scrollTop < this.buffer) {
      this.isScrollDown = true;
    } else {
      this.isScrollDown = false;
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
