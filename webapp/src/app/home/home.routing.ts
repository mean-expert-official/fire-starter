import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { TodoComponent } from './todo/todo.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NoteComponent } from './note/note.component';
import { FileComponent } from '../files/file.component';
import { UploadFormComponent } from '../files/upload/upload-form.component';
import { ContainerListComponent } from '../files/list/container-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ]
      },
      {
        path: 'files',
        component: FileComponent,
        children: [
          { path: '', redirectTo: 'containers', pathMatch: 'full' },
          { path: 'containers', component: ContainerListComponent },
          { path: 'upload', component: UploadFormComponent },
        ]
      },
      { path: 'todos', component: TodoComponent },
      { path: 'notes', component: NoteComponent },
      { path: 'notifications', component: NotificationsComponent },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule { }
