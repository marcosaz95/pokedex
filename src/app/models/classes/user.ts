import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class User {
  private _loggedUser: IUser;

  saveUser(newUser: IUser) {
    const currentUsers: IUser[] = JSON.parse(localStorage.getItem('users'));
    const savedUser = { ...newUser, userId: this._getUniqueNumber() };
    if (!currentUsers) {
      localStorage.setItem('users', JSON.stringify([savedUser]));
    } else {
      localStorage.setItem('users', JSON.stringify(currentUsers.concat([savedUser])));
    }
  }

  validateSignInForm(email: string, password: string): boolean {
    const currentUsers: IUser[] = JSON.parse(localStorage.getItem('users'));
    if (currentUsers && currentUsers.length) {
      const foundUser = currentUsers.find((user: IUser) => user.email === email && user.password === password);
      if (foundUser) {
        this._loggedUser = foundUser;
        return true;
      }
    }
    return false;
  }

  updateUserByNumber(user: IUser) {
    const currentUsers: IUser[] = JSON.parse(localStorage.getItem('users'));
    if (currentUsers && currentUsers.length) {
      const userIdx = currentUsers.findIndex((us: IUser) => us.userId === user.userId);
      if (userIdx !== -1) {
        currentUsers[userIdx] = user;
        this._loggedUser = user;
        localStorage.setItem('users', JSON.stringify(currentUsers));
      }
    }
  }

  isUserValid(): boolean {
    return this._loggedUser ? true : false;
  }

  private _getUniqueNumber(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  get profile(): IUser {
    return this._loggedUser;
  }
}
