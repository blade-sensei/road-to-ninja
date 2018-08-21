import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalTrelloLikeService {


  private projectToEdit$ = new Subject<Project>();
  private projectToEditSaved$ = new Subject<boolean>();
  private isOpenModal$ = new Subject<boolean>();
  private isCreationMode$ = new Subject<boolean>();
  private projectToAddSaved$ = new Subject<Project>();

  constructor() { }

  setProjectToEdit(project: any) {
    this.projectToEdit$.next(project);
  }

  getProjectToEdit(): Observable<any> {
    return this.projectToEdit$.asObservable();
  }

  setProjectToAddSaved(project: any) {
    this.projectToAddSaved$.next(project);
  }

  getProjectToAddSaved(): Observable<any> {
    return this.projectToAddSaved$.asObservable();
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

  getIsCreationMode(): Observable<boolean> {
    return this.isCreationMode$.asObservable();
  }

  setIsCreationMode(creationModel: boolean) {
    this.isCreationMode$.next(creationModel);
  }

}
