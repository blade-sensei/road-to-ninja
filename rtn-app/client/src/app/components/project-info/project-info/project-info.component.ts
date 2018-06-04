import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RequiredProjectsComponent} from '../../required-projects/required-projects.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  @Input() project: any;
  @Input() isUserLogged: boolean;
  @ViewChild('requiredProjects', {read: ViewContainerRef}) requiredProjectsTemplate;
  isUpdateActivated = false;
  componentRef: ComponentRef<RequiredProjectsComponent>;
  constructor(private componentFactory: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  showRequiredProjects() {
    this.requiredProjectsTemplate.clear();
    const factory = this.componentFactory
      .resolveComponentFactory(RequiredProjectsComponent);
    this.componentRef = this.requiredProjectsTemplate.createComponent(factory);
    const requiredProjects = <RequiredProjectsComponent>this.componentRef.instance;
    requiredProjects.requiredProjects = this.project.requires;
  }

  showUpdateButton() {
    this.isUpdateActivated = true;
  }

  hiddeUpdateButton() {
    this.isUpdateActivated = false;
  }

  hideRequiredProjects() {
    this.componentRef.destroy();
  }

}


