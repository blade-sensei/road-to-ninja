import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-requires-edition-container',
  templateUrl: './requires-edition-container.component.html',
  styleUrls: ['./requires-edition-container.component.css']
})
export class RequiresEditionContainerComponent implements OnInit {

  @Input()
  requiredProjects = [];
  requiredProjectsEdition = [];
  requiredProjectSearch = [];
  userSearch = [];
  constructor() { }

  ngOnInit() {
    this.requiredProjectsEdition = this.requiredProjects.slice();
    this.getSearchProjects();
  }

  getSearchProjects() {
    if (this.userSearch.length < 1) {
      this.requiredProjectSearch = this.requiredProjectsEdition.slice();
    } else {
      Object.assign(this.requiredProjectSearch, this.requiredProjectsEdition);
    }

  }

  getProjectStatusIcone(editionProject) {
    if (this.requiredProjects.includes(editionProject)) {
      return '✓';
    }
    return 'x';
  }

  onPickProject(project) {
    if (this.requiredProjectsEdition.includes(project)) {
      this.requiredProjectsEdition = this.requiredProjectsEdition
        .filter(editionProject => editionProject !== project);
    } else {
      this.requiredProjectsEdition.push(project);
    }

    this.getSearchProjects();
  }

}
