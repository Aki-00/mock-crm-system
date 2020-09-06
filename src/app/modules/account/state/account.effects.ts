import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType } from '@ngrx/effects';
import * as accountActions from './account.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { AccountService } from '../account.service';
import { EMPTY, of } from 'rxjs';


@Injectable()
export class AccountEffects {

    
    loadAccounts$ = createEffect(() => this.actions$.pipe(
        ofType(accountActions.AccountActionsTypes.LOAD_ACCOUNTS),
        mergeMap(() => this.accountSerice.getAccounts()
          .pipe(
            map(accounts => ({ type: accountActions.AccountActionsTypes.LOAD_ACCOUNTS_SUCCESS, payload: accounts })),
            catchError((err) => of({ type: accountActions.AccountActionsTypes.LOAD_ACCOUNTS_FAIL, payload:  err}))
          ))
        )
      );    

      constructor(private actions$: Actions, private accountSerice: AccountService){}
}