import { Component, OnInit } from '@angular/core';
import { ModalTrelloLikeService } from '../../services/modal-trello-like/modal-trello-like.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-button-project-add',
  templateUrl: './button-project-add.component.html',
  styleUrls: ['./button-project-add.component.css'],
})
export class ButtonProjectAddComponent implements OnInit {
  constructor(private modalTrelloLikeService: ModalTrelloLikeService) {}

  ngOnInit() {}

  showAddProjectModal() {
    const project = new Project();
    this.modalTrelloLikeService.setIsCreationMode(true);
    this.modalTrelloLikeService.setIsOpenModal(true);
    this.modalTrelloLikeService.setProjectToEdit(project);

    const left = window.innerWidth / 2;
    this.modalTrelloLikeService.setProjectToEditContainerPosition({
      top: 200,
      left: left - 140,
      width: 280,
      height: 300,
    });
  }
}
