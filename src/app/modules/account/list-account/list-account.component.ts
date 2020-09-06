import { Component, OnInit } from '@angular/core';
import { Account} from '../../../models/account';
import { AccountService} from '../account.service';
import { interval, Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as accountActions from '../state/account.actions'; 

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  constructor(private accountService:AccountService, private store: Store) { }

  accounts =[];

  ngOnInit(): void {
    this.store.dispatch(new accountActions.LoadAccounts());
    this.store.pipe(select((state: any) => state.accounts)).subscribe((res) => {
      console.log("res",res)
      if(res.data.accounts){
        this.accounts = res.data.accounts
      }
    })
  }


}
