import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProfileService {
  private currentProfile$ = new Subject<string>();
  private $isUserLoggedIn = new Subject<boolean>();
  currentUser: User = new User();
  constructor() {}

  static getCurrentUserToken() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  static isUserLogged(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.logged;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setIsUserLoggedIn(false);
  }

  getCurrentProfil() {
    return this.currentProfile$.asObservable();
  }

  setCurrentProfil(profil: string) {
    this.currentProfile$.next(profil);
  }

  getIsUserLoggedIn() {
    return this.$isUserLoggedIn.asObservable();
  }

  setIsUserLoggedIn(loggedIn: boolean) {
    return this.$isUserLoggedIn.next(loggedIn);
  }
}
