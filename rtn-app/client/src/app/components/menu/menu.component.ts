import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ProjectAddComponent} from "../project-add/project-add.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  modalRef : BsModalRef;
  constructor(private modalService : BsModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.modalRef = this.modalService.show(ProjectAddComponent);
  }

}
