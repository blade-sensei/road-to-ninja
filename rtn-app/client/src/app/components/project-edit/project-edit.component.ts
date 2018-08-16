import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorService } from '../../services/required-projects-editor/required-projects-editor.service';
import { UserService } from '../user/user.service';
import { AuthenticationService } from '../auth/authentication.service';
import { ProfileService } from '../../services/profile/profile.service';
import { UserProjectsService } from '../user-projects/user-projects.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @Input() project: any = {};
  projectUpdated: any = {};
  projectEditionSaveSubscription: Subscription;
  requireProjectSubscription: Subscription;
  constructor(
    private modelTrelloLikeService: ModalTrelloLikeService,
    private requiresEditionService: RequiredProjectsEditorService,
    private projectService: UserProjectsService,
  ) { }

  ngOnInit() {
    this.projectEditionSaveSubscription = this.modelTrelloLikeService
      .getProjectEditionSaveSource().subscribe(save => this.saveProject());

    this.requireProjectSubscription = this.requiresEditionService
      .getRequireProject().subscribe(requires => {
        this.projectUpdated.requires = requires.slice();
      });
  }

  ngOnChanges() {
    this.copyProjectObject();
  }

  saveProject() {
    this.projectService.updateProject(this.projectUpdated.uid, this.projectUpdated._id, this.projectUpdated).subscribe(editedProject => {
      Object.assign(this.project, editedProject);
      this.modelTrelloLikeService.setOpenModalSource(false);
    });
  }

  copyProjectObject() {
    this.projectUpdated = JSON.parse(JSON.stringify(this.project));
  }

  hasRequires(project) {
    return(
      Object.prototype.hasOwnProperty.call(project, 'requires')
      && this.project.requires.length > 0
    );
  }
}
