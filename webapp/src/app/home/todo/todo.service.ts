import { Injectable, OnDestroy } from '@angular/core';
import { FireLoopRef, Todo } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService implements OnDestroy {

  private todos: Todo[] = new Array<Todo>();
  private todoRef: FireLoopRef<Todo>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FormService,
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(() => {
        this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
        this.subscriptions.push(this.todoRef.on('change')
          .subscribe((todos: Todo[]) => (this.todos = todos)));
        this.subscriptions.push(this.todoRef.stats()
          .subscribe((stats: any) => stats.map((stat: any) => stat.count)));
      }));
  }

  ngOnDestroy() {
    this.todoRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCardButtons() {
    return {
      class: 'btn btn-primary float-right',
      icon: 'plus',
      text: 'Create'
    };
  }

  getTableHeaders() {
    return [
      'Text',
      'Due Date',
      'Done?',
      'Actions',
    ];
  }

  upsert(todo: Todo): Observable<Todo> {
    if (todo.id) {
      return this.todoRef.upsert(todo);
    } else {
      return this.todoRef.create(todo);
    }
  }

  delete(todo: Todo): Observable<Todo> {
    return this.todoRef.remove(todo);
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'update',
    };
  }

  getFormFields(formType: string) {
    const fields = [
      this.formService.input('text', {
        label: 'Text',
        addonLeft: {
          class: 'fa fa-fw fa-commenting'
        }
      }),
      this.formService.date('dueAt', {
        label: 'Due Date',
        // addonLeft: {
        //   class: 'fa fa-fw fa-calendar'
        // }
      }),
    ];
    if (formType === 'update') {
      fields.push(
        this.formService.checkbox('done', {
          label: 'Done?',
        }),
      );
    }
    return fields;
  }

}
