import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: any;
  projectUpdated: any;
  modalEdit: BsModalRef;

  constructor() { }

  ngOnInit() {
    this.copyProjectObject();
  }

  saveProject() {
    Object.assign(this.project, this.projectUpdated);
    this.modalEdit.hide();
  }

  copyProjectObject() {
    this.projectUpdated = JSON.parse(JSON.stringify(this.project));
  }

}
