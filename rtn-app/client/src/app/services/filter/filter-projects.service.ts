import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../models/project';

@Injectable()
export class FilterProjectsService {
  private filteredProjects$ = new Subject<Project[]>();

  constructor() {}

  getFilteredProjects() {
    return this.filteredProjects$.asObservable();
  }

  setFilteredProjects(projects) {
    this.filteredProjects$.next(projects);
  }
}
