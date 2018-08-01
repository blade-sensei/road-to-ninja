import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  @Input() project: any = {};
  projectUpdated: any = {};
  projectEditionSaveSubscription: Subscription;

  constructor(private modelTrelloLikeService: ModalTrelloLikeService) { }

  ngOnInit() {
    this.projectEditionSaveSubscription = this.modelTrelloLikeService
      .getProjectEditionSaveSource().subscribe(save => this.saveProject());
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
}
