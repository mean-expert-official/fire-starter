import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { UserComponent } from './users/user.component';
import { RoleComponent } from './roles/role.component';
import { ControlComponent } from './controls/control.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'users', component: UserComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'controls', component: ControlComponent },
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
