import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router
  ) {
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
  }

  canActivateChild(_childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
  }
}
