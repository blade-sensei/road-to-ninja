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
  constructor(
    private requiresEditService: RequiresEditService,
    ) { }

  ngOnInit() {
  }

  getProjectStatusIcone(editionProject) {
    if (this.requiredProjects.includes(editionProject)) {
      return '✓';
    }
    return 'x';
  }

  onPickProject(project) {
    this.requiredProjects = this.requiredProjects
        .filter(editionProject => editionProject !== project);
    this.requiresEditService.setRequireProject(this.requiredProjects);
  }

}
