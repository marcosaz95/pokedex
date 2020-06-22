import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class User {
  private _loggedUser: IUser;

  /**
   *
   * Saves a new user in localStorage
   * @param {IUser} newUser
   * @memberof User
   */
  saveUser(newUser: IUser) {
    const currentUsers: IUser[] = JSON.parse(localStorage.getItem('users'));
    const savedUser = { ...newUser, userId: this._getUniqueNumber() };
    if (!currentUsers) {
      localStorage.setItem('users', JSON.stringify([savedUser]));
    } else {
      localStorage.setItem('users', JSON.stringify(currentUsers.concat([savedUser])));
    }
  }

  /**
   *
   * Validate if the sign in form has correct information
   * @param {string} email
   * @param {string} password
   * @returns {boolean}
   * @memberof User
   */
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

  /**
   *
   * Updates the user
   * @param {IUser} user
   * @memberof User
   */
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

  /**
   *
   * Validates if there is a user logged (Important for guard)
   * @returns {boolean}
   * @memberof User
   */
  isUserValid(): boolean {
    return this._loggedUser ? true : false;
  }

  /**
   *
   * Gets a random number, unique id for an user
   * @private
   * @returns {string}
   * @memberof User
   */
  private _getUniqueNumber(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  /**
   *
   * returns the logged user for the profile
   * @readonly
   * @type {IUser}
   * @memberof User
   */
  get profile(): IUser {
    return this._loggedUser;
  }
}
