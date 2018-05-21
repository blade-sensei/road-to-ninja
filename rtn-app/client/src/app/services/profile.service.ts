import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

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
}
