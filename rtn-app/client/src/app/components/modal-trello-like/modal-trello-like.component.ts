import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
  selector: 'app-modal-trello-like',
  templateUrl: './modal-trello-like.component.html',
  styleUrls: ['./modal-trello-like.component.css']
})
export class ModalTrelloLikeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  showModal(initialState: object, component: any) {
    this.modalRef = this.modalService.show(component, { initialState });
    return this.modalRef;
  }

}
