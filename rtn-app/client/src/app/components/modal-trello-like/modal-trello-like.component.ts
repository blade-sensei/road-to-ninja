import {
  Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorComponent } from '../required-project-editor/required-project-editor.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-modal-trello-like',
  templateUrl: './modal-trello-like.component.html',
  styleUrls: ['./modal-trello-like.component.css']
})
export class ModalTrelloLikeComponent implements OnInit, OnDestroy {
  @ViewChild(
    'requiredProjectsEditorContainer',
    { read: ViewContainerRef },
  ) requiredProjectsEditorContainer;
  requiredProjectsEditorRef: ComponentRef<RequiredProjectsEditorComponent>;
  @ViewChild('projectEditorContainer',
    { read: ViewContainerRef },
  ) projectEditorContainer;
  projectsEditorRef: ComponentRef<ProjectEditComponent>;

  isModalOpen = false;
  isCreationMode = false;
  hasFormErrors = false;
  projectToEdit: any = {};

  isOpenSubscription: Subscription;
  isCreationModeSubscription: Subscription;
  hasFormErrorsSubscription: Subscription;
  projectSubscription: Subscription;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private componentFactory: ComponentFactoryResolver,
    ) {
  }


  ngOnInit() {
    this.subscribeForIsCreationMode();
    this.subscribeForIsModalOpen();
    this.subscribeForProjectToEdit();
    this.setDropBackClickEvent();
    this.subscribeForHasFormErrors();
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
    this.isCreationModeSubscription.unsubscribe();
    this.hasFormErrorsSubscription.unsubscribe();
  }

  showRequiredProjectEditorContainer() {
    this.requiredProjectsEditorContainer.clear();
    const RequiredProjectsEditorComponentFactory = this.componentFactory
      .resolveComponentFactory(RequiredProjectsEditorComponent);
    this.requiredProjectsEditorRef = this.requiredProjectsEditorContainer
      .createComponent(RequiredProjectsEditorComponentFactory);
    const requiresEditionContainer =
      <RequiredProjectsEditorComponent>this.requiredProjectsEditorRef.instance;
    requiresEditionContainer.currentUserRequiredProjects = this.projectToEdit.requires;
  }

  getDisplayStyle() {
    return this.isModalOpen ? 'block' : 'none';
  }

  closeModal() {
    this.resetStatus();
  }

  resetStatus() {
    this.projectToEdit = {};
    this.isModalOpen = false;
    this.isCreationMode = false;
    this.requiredProjectsEditorContainer.clear();
    this.projectEditorContainer.clear();
    this.projectsEditorRef.destroy();

  }

  setDropBackClickEvent() {
    window.addEventListener('click', (event: any) => {
      if (this.isClickedTargetModal(event)) {
        this.closeModal();
      }
    });
  }

  isClickedTargetModal(event) {
    return (event.target.className === 'modal-trello-edition');
  }

  onSaveProject() {
    this.modalTrelloLikeService.setIsSaveActionDemanded(true);
    this.requiredProjectsEditorContainer.clear();
  }

  showRequiredProjectsEditor() {
    this.showRequiredProjectEditorContainer();
  }

  subscribeForIsModalOpen() {
    this.isOpenSubscription = this.modalTrelloLikeService.getIsOpenModal()
      .subscribe(openModal => {
        if (!openModal) {
          this.closeModal();
        } else {
          this.isModalOpen = openModal;
        }
      });
  }
  subscribeForProjectToEdit() {
    this.projectSubscription = this.modalTrelloLikeService.getProjectToEdit()
      .subscribe(project => {
        this.projectToEdit = project;
        this.showprojectEditorContainer();
      });
  }

  subscribeForIsCreationMode() {
    this.isCreationModeSubscription = this.modalTrelloLikeService
      .getIsCreationMode().subscribe(isCreationMode => {
        this.isCreationMode = isCreationMode;
      });
  }

  subscribeForHasFormErrors() {
    this.hasFormErrorsSubscription = this.modalTrelloLikeService
      .getHasFormEditorErrors()
      .subscribe(hasErrors => this.hasFormErrors = hasErrors);
  }

  showprojectEditorContainer() {
    this.projectEditorContainer.clear();
    const ProjectEditorComponentFactory = this.componentFactory
      .resolveComponentFactory(ProjectEditComponent);
    this.projectsEditorRef = this.projectEditorContainer
      .createComponent(ProjectEditorComponentFactory);
    const editionContainer =
      <ProjectEditComponent>this.projectsEditorRef.instance;
    editionContainer.project = this.projectToEdit;
    editionContainer.isCreationMode = this.isCreationMode;
  }
}
