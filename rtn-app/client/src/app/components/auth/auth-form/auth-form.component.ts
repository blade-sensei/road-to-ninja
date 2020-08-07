import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../../models/user';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  public username: string;
  public password: string;
  public errors: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {}

  onSubmitLogin() {
    this.errors = [];
    if (!this.username || !this.password) {
      if (!this.username) {
        this.errors.push('Username is required');
      }
      if (!this.password) {
        this.errors.push('Password is required');
      }
      this.router.navigate(['/login']);
      return;
    }
    const credentials = { username: this.username, password: this.password };
    this.authenticationService.login(credentials).subscribe(
      () => {
        this.profileService.setIsUserLoggedIn(true);
        this.userService.getCurrentUser().subscribe((user: User) => {
          const redirectionUserProfilePath = `/user/${user.name}`;
          this.router.navigate([redirectionUserProfilePath]);
        });
      },
      error => {
        this.errors.push(`Sorry, login credentials didn't match`);
        this.router.navigate(['/login']);
      },
    );
  }
}
