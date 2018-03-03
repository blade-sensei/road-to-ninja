import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Project} from "../../models/project";

@Injectable()
export class UserProjectsService {

  constructor(private http : HttpClient) {}
  getAllProjects(uid) : Observable<Project[]>{
    return this.http.get<Project[]>(`http://localhost:3000/api/users/${uid}/projects`);
  }
}
