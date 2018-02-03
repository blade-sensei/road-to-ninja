import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../projects.service";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects : any = [];
  constructor(private projectsService : ProjectsService) { }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

}
