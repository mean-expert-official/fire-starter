import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UserActions } from '../actions/user';
import { ErrorActions } from '../actions/error';
import { AccountApi } from '../../shared/sdk/services';
import { getUserById } from '../reducers/user';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private user: AccountApi,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasEntity(route.params['userId'] || route.params['id']);
  }

  protected hasEntityInStore(id: string): Observable<boolean> {
    return this.store.let(getUserById(id))
      .map((entitie) => !!entitie)
      .take(1);
  }

  protected hasEntityInApi(id: string): Observable<boolean> {
    return this.user.findById(id)
      .map((Entity) => new UserActions.findByIdSuccess(Entity))
      .do((action: any) => this.store.dispatch(action))
      .map((Entity) => !!Entity)
      .catch(() => {
        // TODO: How to deal with redirects?
        // this.router.navigate(['/404']);
        return of(false);
      });
  }

  protected hasEntity(id: string): Observable<boolean> {
    return this.hasEntityInStore(id)
      .switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasEntityInApi(id);
      });
  }
}
