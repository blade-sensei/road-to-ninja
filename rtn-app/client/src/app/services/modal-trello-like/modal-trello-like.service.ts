import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../models/project';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalTrelloLikeService {
  private projectToEdit$ = new Subject<Project>();
  private isSaveActionDemanded$ = new Subject<boolean>();
  private isOpenModal$ = new Subject<boolean>();
  private isCreationMode$ = new Subject<boolean>();
  private projectToAddSaved$ = new Subject<Project>();
  private projectToEditSaved$ = new Subject<Project>();
  private hasFormEditorErrors$ = new Subject<boolean>();
  private projectToEditContainerPosition$ = new Subject<object>();

  constructor() {}

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

  setProjectToEditSaved(project: any) {
    this.projectToEditSaved$.next(project);
  }

  getProjectToEditSaved(): Observable<any> {
    return this.projectToEditSaved$.asObservable();
  }

  setIsOpenModal(isOpen: boolean) {
    this.isOpenModal$.next(isOpen);
  }

  getIsOpenModal(): Observable<boolean> {
    return this.isOpenModal$.asObservable();
  }

  setIsSaveActionDemanded(save: boolean) {
    this.isSaveActionDemanded$.next(save);
  }

  getIsSaveActionDemanded(): Observable<boolean> {
    return this.isSaveActionDemanded$.asObservable();
  }

  getIsCreationMode(): Observable<boolean> {
    return this.isCreationMode$.asObservable();
  }

  setIsCreationMode(creationModel: boolean) {
    this.isCreationMode$.next(creationModel);
  }

  getHasFormEditorErrors(): Observable<boolean> {
    return this.hasFormEditorErrors$.asObservable();
  }

  setHasFormEditorErrors(hasErrors: boolean) {
    this.hasFormEditorErrors$.next(hasErrors);
  }

  setProjectToEditContainerPosition(position) {
    this.projectToEditContainerPosition$.next(position);
  }

  getProjectToEditContainerPosition() {
    return this.projectToEditContainerPosition$.asObservable();
  }
}
