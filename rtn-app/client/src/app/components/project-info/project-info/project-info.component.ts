import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  @Input() project : any;
  constructor() { }
  ngOnInit() {
  }

}
