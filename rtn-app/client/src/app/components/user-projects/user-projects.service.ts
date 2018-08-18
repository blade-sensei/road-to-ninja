import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project';

@Injectable()
export class UserProjectsService {

  constructor(private http: HttpClient) {
  }

  getUserProjects(uid, searchText?: string): Observable<Project[]> {
    if (searchText) {
      return this.http.get<Project[]>(`http://localhost:3000/api/users/${uid}/projects?title=${searchText}`);
    }
    return this.http.get<Project[]>(`http://localhost:3000/api/users/${uid}/projects`);
  }

  updateUserProject(uid, id, project): Observable<any> {
    return this.http.patch<Project>(`http://localhost:3000/api/users/${uid}/projects/${id}`, project);
  }
}
