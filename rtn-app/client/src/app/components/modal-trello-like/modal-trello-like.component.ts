import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { RequiredProjectsEditorComponent } from '../required-project-editor/required-project-editor.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-modal-trello-like',
  templateUrl: './modal-trello-like.component.html',
  styleUrls: ['./modal-trello-like.component.css'],
})
export class ModalTrelloLikeComponent implements OnInit, OnDestroy {
  requiredProjectsEditorRef: ComponentRef<RequiredProjectsEditorComponent>;
  @ViewChild('projectEditorContainer', { read: ViewContainerRef })
  projectEditorContainer;
  projectsEditorRef: ComponentRef<ProjectEditComponent>;

  @ViewChild('modalContainer')
  trelloContainer;

  isModalOpen = false;
  isCreationMode = false;
  hasFormErrors = false;
  projectToEdit: any = {};
  editorPosition: any;

  isOpenSubscription: Subscription;
  isCreationModeSubscription: Subscription;
  hasFormErrorsSubscription: Subscription;
  projectSubscription: Subscription;
  projectEditorPositionSubscription: Subscription;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private componentFactory: ComponentFactoryResolver,
  ) {
    this.editorPosition = {
      top: 0,
      left: 0,
      width: 0,
    };
  }

  ngOnInit() {
    this.subscribeForIsCreationMode();
    this.subscribeForIsModalOpen();
    this.subscribeForProjectToEdit();
    this.setDropBackClickEvent();
    this.subscribeForHasFormErrors();
    this.subscribeForProjectEditorPosition();
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
    this.isCreationModeSubscription.unsubscribe();
    this.hasFormErrorsSubscription.unsubscribe();
    this.projectEditorPositionSubscription.unsubscribe();
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
    this.projectEditorContainer.clear();
    this.projectsEditorRef.destroy();
  }

  setDropBackClickEvent() {
    window.addEventListener('click', (event: any) => {
      if (
        this.isClickedTargetModal(event) ||
        event.target.className.includes('modal-content-row') ||
        event.target.className.includes('edit-requires-button')
      ) {
        this.closeModal();
      }
    });
  }

  isClickedTargetModal(event) {
    return event.target.className.includes('modal-trello-edition');
  }

  onSaveProject() {
    this.modalTrelloLikeService.setIsSaveActionDemanded(true);
  }

  subscribeForIsModalOpen() {
    this.isOpenSubscription = this.modalTrelloLikeService
      .getIsOpenModal()
      .subscribe(openModal => {
        if (!openModal) {
          this.closeModal();
        } else {
          this.isModalOpen = openModal;
        }
      });
  }
  subscribeForProjectToEdit() {
    this.projectSubscription = this.modalTrelloLikeService
      .getProjectToEdit()
      .subscribe(project => {
        this.projectToEdit = project;
        this.showprojectEditorContainer();
      });
  }

  subscribeForIsCreationMode() {
    this.isCreationModeSubscription = this.modalTrelloLikeService
      .getIsCreationMode()
      .subscribe(isCreationMode => {
        this.isCreationMode = isCreationMode;
      });
  }

  subscribeForHasFormErrors() {
    this.hasFormErrorsSubscription = this.modalTrelloLikeService
      .getHasFormEditorErrors()
      .subscribe(hasErrors => (this.hasFormErrors = hasErrors));
  }

  subscribeForProjectEditorPosition() {
    this.projectEditorPositionSubscription = this.modalTrelloLikeService
      .getProjectToEditContainerPosition()
      .subscribe(
        containerPosition => (this.editorPosition = containerPosition),
      );
  }

  showprojectEditorContainer() {
    this.projectEditorContainer.clear();
    const ProjectEditorComponentFactory = this.componentFactory.resolveComponentFactory(
      ProjectEditComponent,
    );
    this.projectsEditorRef = this.projectEditorContainer.createComponent(
      ProjectEditorComponentFactory,
    );
    const editionContainer = <ProjectEditComponent>(
      this.projectsEditorRef.instance
    );
    editionContainer.project = this.projectToEdit;
    editionContainer.isCreationMode = this.isCreationMode;
  }

  editorPositionStyle() {
    if (!this.hasContainerEnoughVerticalPlace()) {
      this.editorPosition.top = window.innerHeight / 4;
    }
    return {
      width: `${this.editorPosition.width}px`,
      height: `${this.editorPosition.height}px`,
      'margin-left': `${this.editorPosition.left}px`,
      'margin-top': `${this.editorPosition.top}px`,
    };
  }

  requiredProjectsPositionStyle() {
    let left = this.editorPosition.left + this.editorPosition.width - 15;
    if (!this.hasContainerEnoughPlace()) {
      left = this.editorPosition.left - (360 + 25);
    }
    return {
      'margin-top': `${this.editorPosition.top - 15}px`,
      'margin-left': `${left}px`,
    };
  }

  saveButtonPosition() {
    return {
      'margin-top': '10px',
    };
  }

  hasContainerEnoughPlace() {
    return (
      window.innerWidth -
        (this.editorPosition.left + this.editorPosition.width) >
      300
    );
  }

  hasContainerEnoughVerticalPlace() {
    const saveButtonMarginTop = 10;
    const saveButtonContainerHeight = 40;
    const containerHeight = this.editorPosition.height + saveButtonContainerHeight
      + saveButtonMarginTop;
    const space = window.innerHeight - containerHeight;
    if (this.editorPosition.top <= space) {
      return true;
    }
    return false;
  }
}
