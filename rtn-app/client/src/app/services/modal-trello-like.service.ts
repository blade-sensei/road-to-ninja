import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Project } from '../models/project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalTrelloLikeService {

  private projectEditionSource = new Subject<Project>();
  private openModalSource = new Subject<boolean>();

  constructor() { }

  setProjectEdition(project: any) {
    this.projectEditionSource.next(project);
  }

  getProjectEdition(): Observable<any> {
    return this.projectEditionSource.asObservable();
  }

  setOpenModalSource(isOpen: boolean) {
    this.openModalSource.next(isOpen);
  }

  getOpenModalSource(): Observable<boolean> {
    return this.openModalSource.asObservable();
  }

}
