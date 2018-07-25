import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ModalTrelloLikeService } from '../../services/modal-trello-like.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  private _project: any = {};
  projectUpdated: any = {};

  constructor(private trelloModalService: ModalTrelloLikeService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.copyProjectObject();
    console.log('prev value: ', changes);
  }

  saveProject() {
    Object.assign(this._project, this.projectUpdated);
    this.trelloModalService.setOpenModalSource(false);
  }

  copyProjectObject() {
    this.projectUpdated = JSON.parse(JSON.stringify(this._project));
  }

  @Input()
  set project(project: any) {
    console.log('test');
    this._project = project;
  }

}
