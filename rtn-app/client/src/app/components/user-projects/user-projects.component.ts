import { Component, Input, OnInit } from '@angular/core';
import { UserProjectsService } from './user-projects.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { FilterProjectsService } from '../../services/filter/filter-projects.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css'],
})
export class UserProjectsComponent implements OnInit {
  projects: any = [];
  filteredProjects: any = [];
  isUserLogged: boolean;
  @Input()
  user: any;
  projectToAddSavedSubscription: Subscription;
  projectToFilteredSubscription: Subscription;

  constructor(
    private userProjectService: UserProjectsService,
    private modalTrelloLikeService: ModalTrelloLikeService,
    private filterService: FilterProjectsService,
  ) {}

  ngOnInit() {
    this.subscribeToProjectAddSaved();
    this.subscribeToProjectEditSaved();
    this.subscribeToFilteredProjects();
    this.userProjectService
      .getUserProjects(this.user.uid)
      .subscribe(projects => {
        this.projects = projects;
        this.filteredProjects = [...this.projects];
      });
    this.isUserLogged = this.isUserLoggedIn();
  }

  isUserLoggedIn(): boolean {
    const token = ProfileService.getCurrentUserToken();
    if (token) {
      return (
        ProfileService.getCurrentUserToken().username === this.user.username
      );
    }
    return false;
  }

  subscribeToProjectAddSaved() {
    this.projectToAddSavedSubscription = this.modalTrelloLikeService
      .getProjectToAddSaved()
      .subscribe(projectSaved => {
        this.projects.push(projectSaved);
        this.filteredProjects = [...this.projects];
      });
  }

  subscribeToProjectEditSaved() {
    this.projectToAddSavedSubscription = this.modalTrelloLikeService
      .getProjectToEditSaved()
      .subscribe(projectSaved => {
        const projectsUpdated = this.projects.map(project => {
          if (project._id === projectSaved._id) {
            Object.assign(project, projectSaved);
          }
          return project;
        });
        this.projects = projectsUpdated.slice();
        this.filteredProjects = [...this.projects];
      });
  }

  subscribeToFilteredProjects() {
    this.projectToFilteredSubscription = this.filterService
      .getFilteredOptions()
      .subscribe(options => {
        this.filteredProjects = this.projects.filter((project: Project) => {
          console.log(project);
          console.log(options.search);
          return project.title.toLocaleLowerCase().includes(options.search.toLocaleLowerCase());
        });
      });
  }
}
