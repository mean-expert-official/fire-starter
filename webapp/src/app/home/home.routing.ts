import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { TodoComponent } from './todo/todo.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { NoteComponent } from './note/note.component';
import { FileComponent } from '../files/file.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'todos', component: TodoComponent },
      { path: 'notes', component: NoteComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'files', component: FileComponent },
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
