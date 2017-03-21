import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
>>>>>>> base of admin module
=======
>>>>>>> fix missing modules and karma config for testing

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
<<<<<<< HEAD
<<<<<<< HEAD
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
=======
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
>>>>>>> base of admin module
=======
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
>>>>>>> fix missing modules and karma config for testing
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
