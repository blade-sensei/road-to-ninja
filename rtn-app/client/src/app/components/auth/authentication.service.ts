import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../models/token';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  login(credentials): Observable<any> {
    const endpoint = 'http://localhost:3000/api/auth/login';
    return this.httpClient.post(endpoint, credentials).map((token: Token) => {
      if (token && token.token) {
        localStorage.setItem('currentUser', JSON.stringify(token));
      }
      return token;
    });
  }
}
