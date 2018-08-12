import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequiresEditService {

  private requireProjectSource  = new Subject<any>();

  constructor() { }

  setRequireProject(requires: any) {
    this.requireProjectSource.next(requires);
  }

  getRequireProject(): Observable<any> {
    return this.requireProjectSource.asObservable();
  }
}
