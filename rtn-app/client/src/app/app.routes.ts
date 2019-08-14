import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'user/:username', component: UserComponent },
  { path: 'login', component: AuthFormComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [UserComponent];
