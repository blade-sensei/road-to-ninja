import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../models/project';

@Injectable()
export class UserProjectsService {
  constructor(private http: HttpClient) {}

  getUserProjects(uid, options?: object): Observable<Project[]> {
    const basicApiUrl = `http://localhost:3000/api/users/${uid}/projects`;
    let queryParameters = '';
    if (options) {
      if (Reflect.has(options, 'filter')) {
        const filterParameters = Object.entries(Reflect.get(options, 'filter'));
        filterParameters.forEach(property => {
          queryParameters = queryParameters.concat(
            `&${property[0]}=${property[1]}`,
          );
        });
      }
      if (Reflect.has(options, 'search')) {
        queryParameters = queryParameters.concat(
          `&search=${Reflect.get(options, 'search')}`,
        );
      }
      return this.http.get<Project[]>(`${basicApiUrl}?${queryParameters}`);
    }
    return this.http.get<Project[]>(`${basicApiUrl}`);
  }

  updateUserProject(uid, id, project): Observable<any> {
    return this.http.patch<Project>(
      `http://localhost:3000/api/users/${uid}/projects/${id}`,
      project,
    );
  }

  addUserProject(uid, project): Observable<any> {
    return this.http.post<Project>(
      `http://localhost:3000/api/users/${uid}/projects`,
      project,
    );
  }
}
