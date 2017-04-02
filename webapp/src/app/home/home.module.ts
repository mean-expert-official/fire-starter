import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home.routing';
import { UiModule } from '../ui/ui.module';
import { AuthModule } from '../auth/auth.module';

import { TodoModule } from './todo/todo.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NoteModule } from './note/note.module';
import { FileModule } from '../files/file.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    AuthModule,
    TodoModule,
    NoteModule,
    NotificationsModule,
    FileModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [

  ],
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
})

export class HomeModule { }
