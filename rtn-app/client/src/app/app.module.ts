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
import {ModalModule} from "ngx-bootstrap";
import { ProjectAddComponent } from './components/project-add/project-add.component';
import {FormsModule} from "@angular/forms";
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserProjectsComponent,
    ProjectInfoComponent,
    MenuComponent,
    ProjectAddComponent,
    AuthFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents : [ProjectAddComponent],
  providers: [UserService, UserProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
