import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequiredProjectsEditorService {
  private requiredProjectsToEdit$ = new Subject<any>();

  constructor() {}

  setRequiredProjectsToEdit(requires: any) {
    this.requiredProjectsToEdit$.next(requires);
  }

  getRequiredProjectsToEdit(): Observable<any> {
    return this.requiredProjectsToEdit$.asObservable();
  }
}
