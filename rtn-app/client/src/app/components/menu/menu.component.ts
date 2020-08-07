import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  public isUserLogged = false;
  @ViewChild('toggleMenu')
  toggleMenu;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    this.isUserLogged = ProfileService.isUserLogged();
    this.profileService.getIsUserLoggedIn()
      .subscribe(isLoggedIn => this.isUserLogged = isLoggedIn);
  }

  onRedirectToLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.profileService.logout();
    this.isUserLogged = false;
    this.router.navigate(['/']);
    this.closeMenuToggle();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  redirectToUserProjects() {
    const username = this.getCurrentUserName();
    this.router.navigate([`user/${username}`]);
    this.closeMenuToggle();
  }

  getCurrentUserName() {
    if (ProfileService.getCurrentUserToken()) {
      return ProfileService.getCurrentUserToken().name;
    }
    return '';
  }

  closeMenuToggle() {
    this.toggleMenu.nativeElement.checked = false;
  }
}
