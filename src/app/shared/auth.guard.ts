import { CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/classes/user';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private _user: User, private _router: Router) {}

  canLoad() {
    if (!this._user.isUserValid()) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}
