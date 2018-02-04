///<reference path="app.routes.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import {UserService} from "./components/user/user.service";
import { AppRoutingModule, routingComponents } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
      AppRoutingModule// Add routes to the app
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
