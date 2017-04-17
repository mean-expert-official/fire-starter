import { Component, OnDestroy } from '@angular/core';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { FireLoopRef, Todo, Note, Container } from '../../shared/sdk/models';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-dashboard',
  template: `
  <app-card icon="tachometer" title="Dashboard">
    <div *ngIf="dashCards" class="row">
      <div *ngFor="let item of dashCards" class="col">
        <a class="dash-card" [routerLink]="item.link">
          <div class="card mb-3">
            <div class="card-header">
              <h5 class="card-title text-center text-white mb-0">{{ item.title }}</h5>
            </div>
            <div class="card-block text-center">
              <i [class]="'fa fa-fw fa-3x fa-' + item.icon"></i>
              <h4><span class="badge badge-primary">{{ item.data | number }}</span></h4>
            </div>
          </div>
        </a>
      </div>
    </div>
  </app-card>
  `,
  styleUrls: ['../home.component.scss']
})

export class DashboardComponent implements OnDestroy {

  public dashCards: any = [];
  public todos: Todo[] = new Array<Todo>();
  private todoRef: FireLoopRef<Todo>;
  public notes: Note[] = new Array<Note>();
  private noteRef: FireLoopRef<Note>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (fire: any) => {
          this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
          this.subscriptions.push(this.todoRef.on('change').subscribe(
            (todos: Todo[]) => {
              this.todos = todos;
              this.setDashCards();
            }));
          this.noteRef = this.rt.FireLoop.ref<Note>(Note);
          this.subscriptions.push(this.noteRef.on('change').subscribe(
            (notes: Note[]) => {
              this.notes = notes
              this.setDashCards();
            }));
        }));
  }

  ngOnDestroy() {
    this.todoRef.dispose();
    this.noteRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setDashCards() {
    this.dashCards = [
      {
        'title': 'Todos',
        'link': '/home/todos',
        'icon': 'check-square-o',
        'data': this.todos.length
      },
      {
        'title': 'Notes',
        'link': '/home/notes',
        'icon': 'sticky-note-o',
        'data': this.notes.length
      }
    ]
  }

}
