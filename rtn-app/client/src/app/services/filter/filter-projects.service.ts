import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../models/project';

@Injectable()
export class FilterProjectsService {
  private filteredProjects$ = new Subject<any>();

  constructor() {}

  getFilteredOptions() {
    return this.filteredProjects$.asObservable();
  }

  setFilteredOptions(options: object) {
    this.filteredProjects$.next(options);
  }
}
