import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { UserService } from './components/user/user.service';
import { AppRoutingModule, routingComponents } from './app.routes';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { UserProjectsService } from './components/user-projects/user-projects.service';
import { MenuComponent } from './components/menu/menu.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { AuthenticationService } from './components/auth/authentication.service';
import { AuthInterceptorService } from './services/authentication/auth-interceptor.service';
import { ProfileService } from './services/profile/profile.service';
import { RequiredProjectsComponent } from './components/required-projects/required-projects.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ModalTrelloLikeComponent } from './components/modal-trello-like/modal-trello-like.component';
import { ModalTrelloLikeService } from './services/modal-trello-like/modal-trello-like.service';
import { RequiredProjectsEditorComponent } from './components/required-project-editor/required-project-editor.component';
import { RequiredProjectsEditorService } from './services/required-projects-editor/required-projects-editor.service';
import { ButtonProjectAddComponent } from './components/button-project-add/button-project-add.component';
import { FilterProjectsComponent } from './components/filter-projects/filter-projects.component';
import { FilterProjectsService } from './services/filter/filter-projects.service';
import { ProjectService } from './services/project/project.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserProjectsComponent,
    ProjectInfoComponent,
    MenuComponent,
    ProjectAddComponent,
    AuthFormComponent,
    RequiredProjectsComponent,
    ProjectEditComponent,
    ModalTrelloLikeComponent,
    RequiredProjectsEditorComponent,
    ButtonProjectAddComponent,
    FilterProjectsComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  entryComponents: [
    ProjectAddComponent,
    RequiredProjectsComponent,
    RequiredProjectsEditorComponent,
    ProjectEditComponent,
  ],
  providers: [
    UserService,
    UserProjectsService,
    AuthenticationService,
    ProfileService,
    FilterProjectsService,
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ModalTrelloLikeService,
    RequiredProjectsEditorService,
    ToastrService,
    {
      provide: APP_BASE_HREF, useValue: environment.appURL
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
