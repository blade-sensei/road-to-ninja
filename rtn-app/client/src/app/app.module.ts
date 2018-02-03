import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './components/app/app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RouterModule } from '@angular/router';
import {ProjectsService} from "./components/projects/projects.service";

const routes = [
  {
    path : 'projects',
    component : ProjectsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
