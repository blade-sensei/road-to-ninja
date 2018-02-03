import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) { }

  // Get all posts from the API
  getAllProjects() {
    return this.http.get('http://localhost:3000/api/projects')
  }
}
