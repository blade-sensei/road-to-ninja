import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserProjectsService {

  constructor(private http : HttpClient) {}
  getAllProjects(uid){
    return this.http.get(`http://localhost:3000/api/users/${uid}/projects`);
  }
}
