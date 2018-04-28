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
}
