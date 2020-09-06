import { Action } from '@ngrx/store';
import { Account } from '../../../models/account';

export enum AccountActionsTypes {
    LOAD_ACCOUNTS = '[Accounts] LOAD_ACCOUNTS',
    LOAD_ACCOUNTS_SUCCESS = '[Accounts] LOAD_ACCOUNTS_SUCCESS',
    LOAD_ACCOUNTS_FAIL = '[Accounts] LOAD_ACCOUNTS_FAIL',
    
    LOAD_ACCOUNT = '[Accounts] LOAD_ACCOUNT',
    LOAD_ACCOUNT_SUCCESS = '[Accounts] LOAD_ACCOUNT_SUCCESS',
    LOAD_ACCOUNT_FAIL = '[Accounts] LOAD_ACCOUNT_FAIL'

}

// action to load api
export class LoadAccounts implements Action {
    readonly type = AccountActionsTypes.LOAD_ACCOUNTS;
}

// action call api success
export class LoadAccountsSuccess implements Action {
    readonly type = AccountActionsTypes.LOAD_ACCOUNTS;
    constructor(public payload: Account[]){}
}


// action call api fail
export class LoadAccountsFail implements Action {
    readonly type = AccountActionsTypes.LOAD_ACCOUNTS;
    constructor(public payload: string){}
}

export type Actions = LoadAccounts |
                    LoadAccountsSuccess| 
                    LoadAccountsFail 
 