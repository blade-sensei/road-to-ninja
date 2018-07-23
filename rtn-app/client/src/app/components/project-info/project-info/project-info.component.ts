import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RequiredProjectsComponent } from '../../required-projects/required-projects.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectEditComponent } from '../../project-edit/project-edit.component';
import { ModalTrelloLikeComponent } from '../../modal-trello-like/modal-trello-like.component';
import { ModalTrelloLikeService } from '../../../services/modal-trello-like.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  @Input() project: any;
  @Input() isUserLogged: boolean;
  @ViewChild('requiredProjects', { read: ViewContainerRef }) requiredProjectsTemplate;
  @ViewChild('trello', { read: ViewContainerRef }) trello;
  private isUpdateActivated = false;
  componentRef: ComponentRef<RequiredProjectsComponent>;
  trelloRef: ComponentRef<ModalTrelloLikeComponent>;
  modalEdit: BsModalRef;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalTrelloService: ModalTrelloLikeService) {
  }

  ngOnInit() {
  }

  showRequiredProjects() {
    this.requiredProjectsTemplate.clear();
    const factory = this.componentFactory
      .resolveComponentFactory(RequiredProjectsComponent);
    this.componentRef = this.requiredProjectsTemplate.createComponent(factory);
    const requiredProjects = <RequiredProjectsComponent>this.componentRef.instance;
    requiredProjects.requiredProjects = this.project.requires;
  }

  showUpdateButton() {
    this.isUpdateActivated = true;
  }

  hiddeUpdateButton() {
    this.isUpdateActivated = false;
  }

  hideRequiredProjects() {
    this.componentRef.destroy();
  }

  showEditModal(project) {
    this.modalTrelloService.setOpenModalSource(true);
    this.modalTrelloService.setProjectEdition(this.project);
  }

}


