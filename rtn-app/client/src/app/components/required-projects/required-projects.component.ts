import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-projects',
  templateUrl: './required-projects.component.html',
  styleUrls: ['./required-projects.component.css'],
})
export class RequiredProjectsComponent implements OnInit {
  @Input()
  requiredProjects: any;

  constructor() {}

  ngOnInit() {}
}
