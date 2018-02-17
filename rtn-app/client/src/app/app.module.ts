///<reference path="app.routes.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import {UserService} from "./components/user/user.service";
import { AppRoutingModule, routingComponents } from "./app.routes";
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { ProjectInfoComponent } from './components/project-info/project-info/project-info.component';
import {UserProjectsService} from "./components/user-projects/user-projects.service";
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserProjectsComponent,
    ProjectInfoComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
      AppRoutingModule// Add routes to the app
  ],
  providers: [UserService, UserProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
