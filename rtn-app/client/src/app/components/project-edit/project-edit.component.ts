import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorService } from '../../services/required-projects-editor/required-projects-editor.service';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  @Input()
  project: any = {};
  projectBeingUpdated: any = {};
  @Input()
  isCreationMode = false;
  projectToEditSavedSubscription: Subscription;
  requiredProjectsToEditSavedSubscription: Subscription;
  projectForm: FormGroup;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private requiredProjectsEditorService: RequiredProjectsEditorService,
    private userProjectsService: UserProjectsService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.subscribeToProjectToEditSaved();
    this.subscribeToRequiredProjectsToEditSaved();
    this.createFormValidator();
    this.onChanges();
    this.copyProjectObject();
  }

  ngOnDestroy() {
    this.projectToEditSavedSubscription.unsubscribe();
    this.requiredProjectsToEditSavedSubscription.unsubscribe();
  }

  saveProject() {
    this.userService.getCurrentUser().subscribe((user: User) => {
      if (this.isCreationMode) {
        this.userProjectsService
          .addUserProject(user.uid, this.projectBeingUpdated)
          .subscribe(project => {
            this.modalTrelloLikeService.setProjectToAddSaved(project);
          });
      } else {
        this.userProjectsService
          .updateUserProject(
            this.projectBeingUpdated.uid,
            this.projectBeingUpdated._id,
            this.projectBeingUpdated,
          )
          .subscribe(editedProject => {
            this.modalTrelloLikeService.setProjectToEditSaved(editedProject);
          });
      }
      this.modalTrelloLikeService.setIsOpenModal(false);
    });
  }

  copyProjectObject() {
    this.projectBeingUpdated = JSON.parse(JSON.stringify(this.project));
  }

  hasRequiredProjects(project) {
    return (
      Object.prototype.hasOwnProperty.call(project, 'requires') &&
      this.project.requires.length > 0
    );
  }

  subscribeToProjectToEditSaved() {
    this.projectToEditSavedSubscription = this.modalTrelloLikeService
      .getIsSaveActionDemanded()
      .subscribe(() => this.saveProject());
  }

  subscribeToRequiredProjectsToEditSaved() {
    this.requiredProjectsToEditSavedSubscription = this.requiredProjectsEditorService
      .getRequiredProjectsToEdit()
      .subscribe(savedRequiredProject => {
        this.projectBeingUpdated.requires = savedRequiredProject.slice();
      });
  }

  createFormValidator() {
    this.projectForm = new FormGroup({
      title: new FormControl(this.projectBeingUpdated.title, [
        Validators.required,
      ]),
    });
  }

  get title() {
    return this.projectForm.get('title');
  }

  onChanges(): void {
    this.projectForm.get('title').valueChanges.subscribe(() => {
      this.modalTrelloLikeService.setHasFormEditorErrors(
        !!this.projectForm.get('title').errors,
      );
    });
  }
}
