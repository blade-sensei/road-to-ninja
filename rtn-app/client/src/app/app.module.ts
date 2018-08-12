///<reference path='app.routes.ts'/>
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
import { FormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { AuthenticationService } from './components/auth/authentication.service';
import { AuthInterceptorService } from './services/authentication/auth-interceptor.service';
import { ProfileService } from './services/profile/profile.service';
import { RequiredProjectsComponent } from './components/required-projects/required-projects.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ModalTrelloLikeComponent } from './components/modal-trello-like/modal-trello-like.component';
import { ModalTrelloLikeService } from './services/modal-trello-like/modal-trello-like.service';
import { RequiresEditionContainerComponent } from './components/requires-edition-container/requires-edition-container.component';
import { RequiresEditService } from './services/requires-edit/requires-edit.service';

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
    RequiresEditionContainerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    ProjectAddComponent,
    RequiredProjectsComponent,
    RequiresEditionContainerComponent,
  ],
  providers: [
    UserService,
    UserProjectsService,
    AuthenticationService,
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ModalTrelloLikeService,
    RequiresEditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
