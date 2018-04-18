import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public username: string;
  public password: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    const credentials = {
      username: this.username,
      password: this.password,
    };
    this.authenticationService.login(credentials).subscribe(
      token => {
        this.router.navigate(['/']);
      },
      error => {
        this.router.navigate(['/login']);
        //redirect login page with errors
      },
    );
  }

}
