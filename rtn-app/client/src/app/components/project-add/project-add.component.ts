import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  project : any = {
    name : ''
  };
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  showData(){
    console.log(this.project.name);
  }

}
