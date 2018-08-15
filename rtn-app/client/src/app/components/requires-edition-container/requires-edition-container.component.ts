import { Component, Input, OnInit } from '@angular/core';
import { RequiresEditService } from '../../services/requires-edit/requires-edit.service';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { ProfileService } from '../../services/profile/profile.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-requires-edition-container',
  templateUrl: './requires-edition-container.component.html',
  styleUrls: ['./requires-edition-container.component.css']
})
export class RequiresEditionContainerComponent implements OnInit {

  @Input()
  requiredProjects = [];
  requiredProjectsSearch: any = {};

  constructor(
    private requiresEditService: RequiresEditService,
    private userProjectService: UserProjectsService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.requiredProjectsSearch = this.requiredProjects.slice();
  }

  getProjectStatusIcone(editionProject) {

    const isProjectIncluded =  this.requiredProjects.some(project => {
      return project.title === editionProject.title;
    });

    if (isProjectIncluded) {
      return '✓';
    }
    return 'x';
  }

  onPickProject(project) {
    const isProjectIncluded = this.requiredProjects.includes(project);
    if (!isProjectIncluded) {
      this.requiredProjects.push(project);
    } else {
      this.requiredProjects = this.requiredProjects
        .filter(editionProject => editionProject !== project);
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

}
