import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RequiredProjectsComponent } from '../required-projects/required-projects.component';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../models/project';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css'],
})
export class ProjectInfoComponent implements OnInit {
  isUpdateActivated = false;
  private requiredListIsOpen = false;
  requiredListToggleArrow = '▶';
  @Input()
  project: any;
  @Input()
  isUserLogged: boolean;
  @ViewChild('currentUserRequiredProjectsTemplate', { read: ViewContainerRef })
  requiredProjectsTemplate;
  requiredProjectsComponentRef: ComponentRef<RequiredProjectsComponent>;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalTrelloLikeService: ModalTrelloLikeService,
    private userProjectService: UserProjectsService,
    private projectService: ProjectService,
    private userService: UserService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {}

  showRequiredProjects() {
    if (this.requiredListIsOpen) {
      this.requiredProjectsTemplate.clear();
      this.requiredProjectsComponentRef.destroy();
    } else {
      this.requiredProjectsTemplate.clear();
      const factory = this.componentFactory.resolveComponentFactory(
        RequiredProjectsComponent,
      );
      this.projectService
        .getProjectById(this.project._id)
        .subscribe((project: Project) => {
          this.project.requires = project.requires;
          this.requiredProjectsComponentRef = this.requiredProjectsTemplate.createComponent(
            factory,
          );
          const requiredProjects = <RequiredProjectsComponent>(
            this.requiredProjectsComponentRef.instance
          );
          requiredProjects.requiredProjects = this.project.requires;
        });
    }
    this.requiredListIsOpen = !this.requiredListIsOpen;
    this.changeRequiredListArrow();
  }

  showUpdateButton() {
    this.isUpdateActivated = true;
  }

  hiddeUpdateButton() {
    this.isUpdateActivated = false;
  }

  showEditModal(project, target) {
    const infoProjectDOMElement =
      target.parentElement.parentElement.parentElement.parentElement;
    let top = infoProjectDOMElement.getBoundingClientRect().top;
    const left = infoProjectDOMElement.offsetLeft;
    const width = infoProjectDOMElement.offsetWidth;
    const height = infoProjectDOMElement.offsetHeight;
    const cardinalContainerPosition = {
      top,
      left,
      width,
      height,
    };

    this.modalTrelloLikeService.setProjectToEditContainerPosition(
      cardinalContainerPosition,
    );
    this.modalTrelloLikeService.setIsCreationMode(false);
    this.modalTrelloLikeService.setIsOpenModal(true);
    this.modalTrelloLikeService.setProjectToEdit(
      JSON.parse(JSON.stringify(project)),
    );
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

  async startProjectWork(project) {
    const userHasProjectInProgress = await this.hasUserProjectInProgress();
    if (!userHasProjectInProgress) {
      this.changeStatus('in progress', project);
    } else {
      this.toaster.info(
        'Information',
        'You have already an in progress project',
      );
    }
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

  async hasUserProjectInProgress() {
    const currentUser: User = await this.userService
      .getCurrentUser()
      .toPromise();
    const userProjects = await this.userProjectService
      .getUserProjects(currentUser.uid)
      .toPromise();
    return userProjects.some(
      userProject => userProject.status === 'in progress',
    );
  }

  changeRequiredListArrow() {
    this.requiredListToggleArrow = this.requiredListIsOpen ? '▼' : '▶';
  }
}
