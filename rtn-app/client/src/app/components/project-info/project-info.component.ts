import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input, OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RequiredProjectsComponent } from '../required-projects/required-projects.component';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  private isUpdateActivated = false;
  @Input() project: any;
  @Input() isUserLogged: boolean;
  @ViewChild(
    'currentUserRequiredProjects',
    { read: ViewContainerRef }
  ) requiredProjectsTemplate;
  RequiredProjectsComponentRef: ComponentRef<RequiredProjectsComponent>;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalTrelloLikeService: ModalTrelloLikeService,
  ) {
  }

  ngOnInit() {
  }

  showRequiredProjects() {
    this.requiredProjectsTemplate.clear();
    const factory = this.componentFactory
      .resolveComponentFactory(RequiredProjectsComponent);
    this.RequiredProjectsComponentRef = this.requiredProjectsTemplate.createComponent(factory);
    const requiredProjects = <RequiredProjectsComponent>this.RequiredProjectsComponentRef.instance;
    requiredProjects.requiredProjects = this.project.requires;
  }

  showUpdateButton() {
    this.isUpdateActivated = true;
  }

  hiddeUpdateButton() {
    this.isUpdateActivated = false;
  }

  showEditModal(project) {
    this.modalTrelloLikeService.setIsOpenModal(true);
    this.modalTrelloLikeService.setProjectToEdit(project);
  }

}


