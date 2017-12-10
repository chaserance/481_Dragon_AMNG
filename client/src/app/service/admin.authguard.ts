import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthguard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAdmin) {
      return true;
    } else if (this.authService.isAuthenticated) {
      // this.router.navigate(['/']);
      console.log('403 from admin');
    }
    this.router.navigate(['/login']);
    return false;
  }
}
