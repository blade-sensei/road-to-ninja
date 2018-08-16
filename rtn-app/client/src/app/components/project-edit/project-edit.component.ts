import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorService } from '../../services/required-projects-editor/required-projects-editor.service';
import { UserProjectsService } from '../user-projects/user-projects.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @Input() project: any = {};
  projectBeingUpdated: any = {};
  projectToEditSavedSubscription: Subscription;
  requiredProjectsToEditSavedSubscription: Subscription;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private requiredProjectsEditorService: RequiredProjectsEditorService,
    private userProjectsService: UserProjectsService,
    ) {
  }

  ngOnInit() {
    this.subscribeToProjectToEditSaved();
    this.subscribeToRequiredProjectsToEditSaved();
  }

  ngOnChanges() {
    this.copyProjectObject();
  }

  saveProject() {
    this.userProjectsService.updateProject(
      this.projectBeingUpdated.uid,
      this.projectBeingUpdated._id,
      this.projectBeingUpdated
    ).subscribe(editedProject => {
      Object.assign(this.project, editedProject);
      this.modalTrelloLikeService.setIsOpenModal(false);
    });
  }

  copyProjectObject() {
    this.projectBeingUpdated = JSON.parse(JSON.stringify(this.project));
  }

  hasRequiredProjects(project) {
    return (
      Object.prototype.hasOwnProperty.call(project, 'requires')
      && this.project.requires.length > 0
    );
  }

  subscribeToProjectToEditSaved() {
    this.projectToEditSavedSubscription = this.modalTrelloLikeService
      .getProjectToEditSaved().subscribe(() => this.saveProject());
  }

  subscribeToRequiredProjectsToEditSaved() {
    this.requiredProjectsToEditSavedSubscription = this.requiredProjectsEditorService
      .getRequireProject()
      .subscribe(savedRequiredProject => {
        this.projectBeingUpdated.requires = savedRequiredProject.slice();
      });
  }

}
