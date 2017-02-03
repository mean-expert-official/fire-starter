import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/todos', pathMatch: 'full' },
      { path: 'todos', component: TodoComponent },
      { path: 'auth', component: AuthComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
