import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like.service';
import { Subscription } from 'rxjs/Subscription';

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
    private modalTrelloLikeService: ModalTrelloLikeService,
  ) { }


  ngOnInit() {
    this.isOpenSubscription = this.modalTrelloLikeService.getOpenModalSource()
      .subscribe(openModal => this.isModalOpen = openModal);
    this.projectSubscription =  this.modalTrelloLikeService.getProjectEdition()
      .subscribe(project => {
        this.projectEdition = project;
      });
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
    this.projectEdition = {};
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

  onSaveProject() {
    this.modalTrelloLikeService.setProjectEditionSaveSource(true);
  }
}
