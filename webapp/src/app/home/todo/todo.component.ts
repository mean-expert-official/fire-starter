import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { FireLoopRef, Todo } from '../../shared/sdk/models';
import { TodoFormComponent } from './todo-form.component';
import { TodoService } from './todo.service';
import { UiService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnDestroy {

  private modalRef;
  public todos: Todo[] = new Array<Todo>();
  private todoRef: FireLoopRef<Todo>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public todoService: TodoService,
    private rt: RealTime
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (fire: any) => {
          this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
          this.subscriptions.push(this.todoRef.on('change').subscribe(
            (todos: Todo[]) => {
              this.todos = todos;
            }));
        }));
  }

  ngOnDestroy() {
    this.todoRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(TodoFormComponent, { size: 'sm' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.todoService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Todo' : 'Update Todo';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new Todo());
  }

  update(todo: Todo) {
    this.showDialog('update', todo);
  }

  delete(todo: Todo) {
    const question = {
      title: 'Delete Todo',
      html: `
        <p class="lead">Are you sure you want to delete the
          <span class="font-weight-bold font-italic">${todo.text}</span> Todo?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: todo }), () => { });
  }


  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.todoRef.create(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('Todo Created', 'The Todo was created successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create Todo Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.todoRef.upsert(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('Todo Updated', 'The Todo was updated successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update Todo Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.todoRef.remove(event.payload).subscribe(
          () => {
            this.uiService.toastSuccess('Todo Deleted', 'The Todo was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Todo Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
