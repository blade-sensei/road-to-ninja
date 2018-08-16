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
  projectToEdit: any = {};
  @ViewChild(
    'requiredProjectsEditorContainer',
    { read: ViewContainerRef },
  ) requiredProjectsEditorContainer;
  requiredProjectsEditorRef: ComponentRef<RequiredProjectsEditorComponent>;

  isOpenSubscription: Subscription;
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
    requiresEditionContainer.requiredProjects = this.projectToEdit.requires;
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
    this.modalTrelloLikeService.setProjectEditionSaveSource(true);
    this.requiredProjectsEditorContainer.clear();
  }

  showRequiredProjectsEditor() {
    this.showRequiredProjectEditorContainer();
  }

  subscribeForIsModalOpen() {
    this.isOpenSubscription = this.modalTrelloLikeService.getOpenModalSource()
      .subscribe(openModal => this.isModalOpen = openModal);
  }
  subscribeForProjectToEdit() {
    this.projectSubscription = this.modalTrelloLikeService.getProjectEdition()
      .subscribe(project => {
        this.projectToEdit = project;
      });
  }

}
