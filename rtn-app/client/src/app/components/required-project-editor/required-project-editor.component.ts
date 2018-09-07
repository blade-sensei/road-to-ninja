import { Component, Input, OnInit } from '@angular/core';
import { RequiredProjectsEditorService } from '../../services/required-projects-editor/required-projects-editor.service';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { ProfileService } from '../../services/profile/profile.service';
import { User } from '../../models/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-requires-edition-container',
  templateUrl: './required-project-editor.component.html',
  styleUrls: ['./required-project-editor.component.css']
})
export class RequiredProjectsEditorComponent implements OnInit {

  @Input()
  currentUserRequiredProjects = [];
  requiredProjectsSearchResult: any = {};

  constructor(
    private requiredProjectsEditorService: RequiredProjectsEditorService,
    private userProjectService: UserProjectsService,
    private profileService: ProfileService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.requiredProjectsSearchResult = this.currentUserRequiredProjects.slice();
  }

  getProjectStatusIcone(editionProject) {
    return this.isIncludeInCurrentRequiredProjects(editionProject) ? '✅' : '❌';
  }

  onPickProject(project) {
    if (!this.isIncludeInCurrentRequiredProjects(project)) {
      this.currentUserRequiredProjects.push(project);
    } else {
      this.removeFromCurrentUserRequiredProjects(project);
    }
    this.requiredProjectsEditorService
      .setRequiredProjectsToEdit(this.currentUserRequiredProjects);
  }

  removeFromCurrentUserRequiredProjects(project) {
    this.currentUserRequiredProjects = this.currentUserRequiredProjects
      .filter(editionProject => editionProject.title !== project.title);
  }

  searchProject(event: any) {
    this.userService.getCurrentUser()
      .subscribe((currentUser: User) => {
        const searchText = event.target.value;
        if (searchText) {
          this.userProjectService
            .getUserProjects(currentUser.uid, { search: searchText })
            .subscribe(projects => this.requiredProjectsSearchResult = projects);
        } else {
          this.requiredProjectsSearchResult = this.currentUserRequiredProjects.slice();
        }
      });
  }

  isIncludeInCurrentRequiredProjects(editionProject) {
    return this.currentUserRequiredProjects.some(project => {
      return project.title === editionProject.title;
    });
  }

}
