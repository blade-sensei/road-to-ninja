import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';
import { Project } from '../../models/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-modal-trello-like',
  templateUrl: './modal-trello-like.component.html',
  styleUrls: ['./modal-trello-like.component.css']
})
export class ModalTrelloLikeComponent implements OnInit, OnDestroy {
  isModalOpen = false;
  projectEdition: any = {};

  isOpenSubscription: Subscription;
  projectSubscription: Subscription;
  constructor(
    private modalTrelloService: ModalTrelloLikeService,
  ) {
      this.isOpenSubscription = this.modalTrelloService.getOpenModalSource()
        .subscribe(openModal => this.isModalOpen = openModal);
      this.projectSubscription =  this.modalTrelloService.getProjectEdition()
      .subscribe(project => this.projectEdition = project);
    }

  ngOnInit() {
   this.setDropBackClickEvent();
  }

  ngOnDestroy() {
    this.isOpenSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  getDisplayStyle() {
    return this.isModalOpen ? 'block' : 'none';
  }

  closeModal() {
    this.isModalOpen = false;
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
}
