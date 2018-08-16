import { Component, Input, OnInit } from '@angular/core';
import { RequiredProjectsEditorService } from '../../services/required-projects-editor/required-projects-editor.service';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { ProfileService } from '../../services/profile/profile.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-requires-edition-container',
  templateUrl: './required-project-editor.component.html',
  styleUrls: ['./required-project-editor.component.css']
})
export class RequiredProjectsEditorComponent implements OnInit {

  @Input()
  requiredProjects = [];
  requiredProjectsSearch: any = {};

  constructor(
    private requiresEditService: RequiredProjectsEditorService,
    private userProjectService: UserProjectsService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.requiredProjectsSearch = this.requiredProjects.slice();
  }

  getProjectStatusIcone(editionProject) {

    if (this.isIncludeInRequires(editionProject)) {
      return '✓';
    }
    return 'x';
  }

  onPickProject(project) {
    console.log(!this.isIncludeInRequires(project));
    if (!this.isIncludeInRequires(project)) {
      this.requiredProjects.push(project);
    } else {
      this.requiredProjects = this.requiredProjects
        .filter(editionProject => editionProject.title !== project.title);
    }
    this.requiresEditService.setRequireProject(this.requiredProjects);
  }

  searchProject(event: any) {
    const currentUser: User = this.profileService.getCurrentUser();
    const searchText = event.target.value;
    if (searchText) {
      this.userProjectService.getAllProjects(currentUser.uid, searchText)
        .subscribe(projects => {

          this.requiredProjectsSearch = projects.map(project => {
            return { title: project.title, status: project.status };
          });
        });
    } else {
      this.requiredProjectsSearch = this.requiredProjects.slice();
    }
  }

  isIncludeInRequires(editionProject) {
    return this.requiredProjects.some(project => {
      return project.title === editionProject.title;
    });
  }

}
