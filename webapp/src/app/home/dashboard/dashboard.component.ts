import { Component, OnDestroy } from '@angular/core';
import { TodoApi, NoteApi, ContainerApi } from '../../shared/sdk/services';
import { Todo, Note, Container } from '../../shared/sdk/models';
import { Subscription } from 'rxjs/Subscription';
import { DashCard } from '../../ui/ui.service';

@Component({
  selector: 'fire-home-dashboard',
  template: `
  <fire-card icon="tachometer" title="Dashboard">
    <div *ngIf="dashCards" class="row align-items-center justify-content-center">
      <div *ngFor="let item of dashCards" class="col-6 col-lg-4">
        <a class="dash-card" [routerLink]="item.link">
          <div class="card card-outline-primary mb-3">
            <h5 class="card-title text-center mb-0">{{ item.name }}</h5>
            <div class="card-block text-center">
              <div class="card-center">
                <i [class]="'fa fa-fw fa-3x fa-' + item.icon"></i>
              </div>
              <h4><span class="badge badge-primary">{{ item.data | number }}</span></h4>
            </div>
          </div>
        </a>
      </div>
    </div>
  </fire-card>
  `,
  styleUrls: ['../home.component.scss']
})

export class DashboardComponent implements OnDestroy {

  public dashCards: DashCard[] = [];
  public todoCount: number;
  public noteCount: number;
  public containerCount: number;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    public todoApi: TodoApi,
    public noteApi: NoteApi,
    public containerApi: ContainerApi,
  ) {
    this.subscriptions.push(this.todoApi.count().subscribe(
      (todos: { count: number }) => {
        this.todoCount = todos.count;
        this.setDashCards();
      }));
    this.subscriptions.push(this.noteApi.count().subscribe(
      (notes: { count: number }) => {
        this.noteCount = notes.count;
        this.setDashCards();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setDashCards() {
    this.dashCards = [
      {
        'name': 'Todos',
        'link': '/home/todos',
        'icon': 'check-square-o',
        'data': this.todoCount
      },
      {
        'name': 'Notes',
        'link': '/home/notes',
        'icon': 'sticky-note-o',
        'data': this.noteCount
      }
    ]
  }

}
