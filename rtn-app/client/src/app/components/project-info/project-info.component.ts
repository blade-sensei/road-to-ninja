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
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  private isUpdateActivated = false;
  private requiredListIsOpen = false;
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
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
  }

  showRequiredProjects() {
    if (this.requiredListIsOpen) {
      this.requiredProjectsTemplate.clear();
      this.RequiredProjectsComponentRef.destroy();
    } else {
      this.requiredProjectsTemplate.clear();
      const factory = this.componentFactory
        .resolveComponentFactory(RequiredProjectsComponent);
      this.projectService.getProjectById(this.project._id).subscribe((project: Project) => {
        this.RequiredProjectsComponentRef = this.requiredProjectsTemplate.createComponent(factory);
        const requiredProjects = <RequiredProjectsComponent>this.RequiredProjectsComponentRef.instance;
        requiredProjects.requiredProjects = project.requires;
      });
    }
    this.requiredListIsOpen = !this.requiredListIsOpen;
  }

  showUpdateButton() {
    this.isUpdateActivated = true;
  }

  hiddeUpdateButton() {
    this.isUpdateActivated = false;
  }

  showEditModal(project, target) {
    const top = target.parentElement.parentElement.parentElement.parentElement.offsetTop;
    const left =  target.parentElement.parentElement.parentElement.parentElement.offsetLeft + 15;
    const width = target.parentElement.parentElement.parentElement.offsetWidth;

    const cardinalContainerPosition = {
      top,
      left,
      width,
    };

    this.modalTrelloLikeService.setProjectToEditContainerPosition(cardinalContainerPosition);
    this.modalTrelloLikeService.setIsCreationMode(false);
    this.modalTrelloLikeService.setIsOpenModal(true);
    this.modalTrelloLikeService.setProjectToEdit(JSON.parse(JSON.stringify(project)));
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


