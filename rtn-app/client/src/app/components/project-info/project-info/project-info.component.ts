import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RequiredProjectsComponent} from '../../required-projects/required-projects.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ProjectEditComponent} from '../../project-edit/project-edit.component';

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
  modalEdit: BsModalRef;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalService: BsModalService,
  ) { }

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

  showEditModal(project) {
    const initialState = { project };
    this.modalEdit = this.modalService.show(ProjectEditComponent, { initialState });
    this.modalEdit.content.modalEdit = this.modalEdit;
  }

}


