import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(credentials): Observable<any> {
    const url = "http://localhost:3000/auth/login";
    console.log(credentials);
    console.log(url);
    return this.httpClient.post(url, credentials);
  }
}
