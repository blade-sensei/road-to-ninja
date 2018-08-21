import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorComponent } from '../required-project-editor/required-project-editor.component';

@Component({
  selector: 'app-modal-trello-like',
  templateUrl: './modal-trello-like.component.html',
  styleUrls: ['./modal-trello-like.component.css']
})
export class ModalTrelloLikeComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  isCreationMode = false;
  projectToEdit: any = {};
  @ViewChild(
    'requiredProjectsEditorContainer',
    { read: ViewContainerRef },
  ) requiredProjectsEditorContainer;
  requiredProjectsEditorRef: ComponentRef<RequiredProjectsEditorComponent>;

  isOpenSubscription: Subscription;
  isCreationModeSubscription: Subscription;
  projectSubscription: Subscription;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private componentFactory: ComponentFactoryResolver,
    ) {
  }


  ngOnInit() {
    this.subscribeForIsModalOpen();
    this.subscribeForProjectToEdit();
    this.setDropBackClickEvent();
    this.subscribeForIsCreationMode();
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
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
    this.modalTrelloLikeService.setProjectToEditSaved(true);
    this.requiredProjectsEditorContainer.clear();
  }

  showRequiredProjectsEditor() {
    this.showRequiredProjectEditorContainer();
  }

  subscribeForIsModalOpen() {
    this.isOpenSubscription = this.modalTrelloLikeService.getIsOpenModal()
      .subscribe(openModal => this.isModalOpen = openModal);
  }
  subscribeForProjectToEdit() {
    this.projectSubscription = this.modalTrelloLikeService.getProjectToEdit()
      .subscribe(project => {
        this.projectToEdit = project;
      });
  }

  subscribeForIsCreationMode() {
    this.isCreationModeSubscription = this.modalTrelloLikeService
      .getIsCreationMode().subscribe(isCreationMode => {
        this.isCreationMode = isCreationMode;
      });
  }

}
