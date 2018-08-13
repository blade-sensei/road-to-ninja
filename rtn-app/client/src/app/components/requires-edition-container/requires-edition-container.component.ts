import { Component, Input, OnInit } from '@angular/core';
import { RequiresEditService } from '../../services/requires-edit/requires-edit.service';

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
    ) { }

  ngOnInit() {
    this.requiredProjectsSearch = this.requiredProjects.slice();
    console.log(this.requiredProjectsSearch);
  }

  getProjectStatusIcone(editionProject) {
    if (this.requiredProjects.includes(editionProject)) {
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

}
