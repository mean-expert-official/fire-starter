import { Component, OnDestroy } from '@angular/core';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { FireLoopRef, Todo, Note, Container } from '../../shared/sdk/models';
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
        'name': 'Todos',
        'link': '/home/todos',
        'icon': 'check-square-o',
        'data': this.todos.length
      },
      {
        'name': 'Notes',
        'link': '/home/notes',
        'icon': 'sticky-note-o',
        'data': this.notes.length
      }
    ]
  }

}
