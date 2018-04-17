import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public username: string;
  public password: string;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    const credentials = {
      username: this.username,
      password: this.password,
    };
    this.authenticationService.login(credentials).subscribe(
      token => {
        //redirect to admin space
      },
      error => {
        //redirect login page with errors
      },
    );
  }

}
