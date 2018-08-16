import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalTrelloLikeService {

  private projectToEdit$ = new Subject<Project>();
  private isOpenModal$ = new Subject<boolean>();
  private projectToEditSaved$ = new Subject<boolean>();

  constructor() { }

  setProjectToEdit(project: any) {
    this.projectToEdit$.next(project);
  }

  getProjectToEdit(): Observable<any> {
    return this.projectToEdit$.asObservable();
  }

  setIsOpenModal(isOpen: boolean) {
    this.isOpenModal$.next(isOpen);
  }

  getIsOpenModal(): Observable<boolean> {
    return this.isOpenModal$.asObservable();
  }

  setProjectToEditSaved(save: boolean) {
    this.projectToEditSaved$.next(save);
  }

  getProjectToEditSaved(): Observable<boolean> {
    return this.projectToEditSaved$.asObservable();
  }

}
