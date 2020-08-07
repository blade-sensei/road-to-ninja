import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import {environment} from "../../../environments/environment";


@Injectable()
export class UserService {
  private apiURL = environment.apiEndPoint;
  constructor(private http: HttpClient) {}
  getUserByName(name) {
    return this.http.get(`${this.apiURL}/users/${name}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/current-user`);
  }
}
