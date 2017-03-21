import { Injectable, OnDestroy } from '@angular/core';
import { FireLoopRef, Role } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService implements OnDestroy {

  // roles
  public roles: Role[] = new Array<Role>();
  private roleRef: FireLoopRef<Role>;

  // subscriptions
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FormService,
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(() => {
        this.roleRef = this.rt.FireLoop.ref<Role>(Role);
        this.subscriptions.push(this.roleRef.on('change').subscribe(
          (roles: Role[]) => {
            this.roles = roles;
            this.roles.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            });
          }));
      }));
  }

  ngOnDestroy() {
    this.roleRef.dispose();
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
      'Name',
      'Description',
      'Actions',
    ];
  }

  upsert(role: Role): Observable<Role> {
    if (role.id) {
      return this.roleRef.upsert(role);
    } else {
      return this.roleRef.create(role);
    }
  }

  delete(role: Role): Observable<Role> {
    return this.roleRef.remove(role);
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'update',
    };
  }

  getFormFields(formType: string) {
    let fields = [
      this.formService.input('name', {
        label: 'Name',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-tag'
        }
      }),
      this.formService.input('description', {
        label: 'Description',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        }
      }),
    ];
    // console.log(fields);
    return fields;
  }

}
