import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TeacherAuthguard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isTeacher) {
      return true;
    } else if (this.authService.isAuthenticated) {
      console.log('403 from teacher');
    }
    this.router.navigate(['/login']);
    return false;
  }
}
