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
import { UserProjectsService } from '../user-projects/user-projects.service';

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
    'currentUserRequiredProjectsTemplate',
    { read: ViewContainerRef }
  ) requiredProjectsTemplate;
  RequiredProjectsComponentRef: ComponentRef<RequiredProjectsComponent>;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalTrelloLikeService: ModalTrelloLikeService,
    private userProjectService: UserProjectsService,
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
    this.modalTrelloLikeService.setIsCreationMode(false);
    this.modalTrelloLikeService.setIsOpenModal(true);
    this.modalTrelloLikeService.setProjectToEdit(project);
  }

  isProjectInProgressStatus(project) {
    return project.status === 'in progress';
  }

  isProjectNotStartedStatus(project) {
    return project.status === 'not started';
  }

  isProjectFinishedStatus(project) {
    return project.status === 'finished';
  }

  startProjectWork(project) {
    this.changeStatus('in progress', project);
  }

  finishProjectWork(project) {
    this.changeStatus('finished', project);
  }

  changeStatus(status: string, project) {
    const projectToEdit = Object.assign({}, project);
    projectToEdit.status = status;
    this.userProjectService
      .updateUserProject(projectToEdit.uid, projectToEdit._id, projectToEdit)
      .subscribe(updatedProject => {
        this.project = Object.assign({}, updatedProject);
      });
  }

}


