import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";


@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectById(id) {
    return this.http.get(`${environment.apiEndPoint}/projects/${id}`);
  }
}
