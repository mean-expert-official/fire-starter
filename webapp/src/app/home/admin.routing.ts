import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
<<<<<<< HEAD
=======
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
>>>>>>> base of admin module

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
<<<<<<< HEAD
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
=======
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
>>>>>>> base of admin module
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
export class AdminRoutingModule { }
