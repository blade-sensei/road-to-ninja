import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Injectable()
export class ModalTrelloLikeService {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  showModal(component: any, initialState: object) {
    this.modalRef = this.modalService.show(component, { initialState });
    return this.modalRef;
  }
}
