import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public username: string = 'test';
  public password: string = 'test';
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    const credentials = {
      username: this.username,
      password: this.password,
    };
    this.authenticationService.login(credentials).subscribe( (data:any) => {
      console.log(data);
    });
  }

}
