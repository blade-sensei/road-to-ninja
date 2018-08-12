import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiresEditService } from '../../services/requires-edit/requires-edit.service';

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
    private requiresEditionService: RequiresEditService
  ) { }

  ngOnInit() {
    this.projectEditionSaveSubscription = this.modelTrelloLikeService
      .getProjectEditionSaveSource().subscribe(save => this.saveProject());

    this.requireProjectSubscription = this.requiresEditionService
      .getRequireProject().subscribe(requires => {
        console.log(requires);
        this.projectUpdated.requires = requires.slice();
      });
  }

  ngOnChanges() {
    this.copyProjectObject();
  }

  saveProject() {
    Object.assign(this.project, this.projectUpdated);
    this.modelTrelloLikeService.setOpenModalSource(false);
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
