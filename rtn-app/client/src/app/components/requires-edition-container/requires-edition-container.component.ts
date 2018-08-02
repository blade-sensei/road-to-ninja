import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-requires-edition-container',
  templateUrl: './requires-edition-container.component.html',
  styleUrls: ['./requires-edition-container.component.css']
})
export class RequiresEditionContainerComponent implements OnInit {

  @Input()
  requiredProjects: any;
  constructor() { }

  ngOnInit() {
    console.log(this.requiredProjects);
  }

}
