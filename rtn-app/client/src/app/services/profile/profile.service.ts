import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable()
export class ProfileService {

  currentUser: User = new User();
  constructor() { }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  static logout() {
    localStorage.removeItem('currentUser');
  }

  static isUserLogged(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.logged;
    }
    return false;
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
