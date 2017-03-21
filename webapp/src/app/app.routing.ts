import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './auth/auth.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/todos', pathMatch: 'full' },
      { path: 'todos', component: TodoComponent },
      { path: 'notes', component: NoteComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
