// import { CanActivate, CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AppService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if(localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/signup']).then(() => {
      window.location.reload();
    });
    return false;
  }
}
