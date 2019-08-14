import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  project: Project = new Project('', '1a');
  uid: any = '1a';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onRegister(): void {
    this.bsModalRef.hide();
  }
}
