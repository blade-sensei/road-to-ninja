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
  projectEdition: any = {};
  @ViewChild(
    'editionContainerRequires',
    { read: ViewContainerRef }) editionContainerRequires;
  componentRef: ComponentRef<RequiredProjectsEditorComponent>;

  isOpenSubscription: Subscription;
  projectSubscription: Subscription;

  constructor(
    private modalTrelloLikeService: ModalTrelloLikeService,
    private componentFactory: ComponentFactoryResolver,
  ) { }


  ngOnInit() {
    this.isOpenSubscription = this.modalTrelloLikeService.getOpenModalSource()
      .subscribe(openModal => this.isModalOpen = openModal);
    this.projectSubscription = this.modalTrelloLikeService.getProjectEdition()
      .subscribe(project => {
        this.projectEdition = project;
      });
    this.setDropBackClickEvent();
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  showEditionContainerRequires() {
    this.editionContainerRequires.clear();
    const factory = this.componentFactory.resolveComponentFactory(RequiredProjectsEditorComponent);
    this.componentRef = this.editionContainerRequires.createComponent(factory);
    const requiresEditionContainer =
      <RequiredProjectsEditorComponent>this.componentRef.instance;
    requiresEditionContainer.requiredProjects = this.projectEdition.requires;
  }

  getDisplayStyle() {
    return this.isModalOpen ? 'block' : 'none';
  }

  closeModal() {
    this.projectEdition = {};
    this.isModalOpen = false;
    this.editionContainerRequires.clear();
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
    this.editionContainerRequires.clear();
  }

  onShowEditionRequires() {
    this.showEditionContainerRequires();
  }

}
