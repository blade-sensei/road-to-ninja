import {Component, Input, OnInit} from '@angular/core';
import { UserProjectsService} from './user-projects.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  projects: any = [];
  @Input() user: any;
  constructor(private userProjectService: UserProjectsService) { }
  ngOnInit() {
    this.userProjectService.getAllProjects(this.user.uid).subscribe(projects => {
      this.projects = projects;
    });
  }

}
