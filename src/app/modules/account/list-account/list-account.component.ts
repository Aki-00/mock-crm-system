import { Component, OnInit } from '@angular/core';
import { Account} from '../../../models/account';
import { AccountService} from '../account.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  constructor(private accountService:AccountService) { }

  accounts =[];

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((res:any) =>{
      console.log("res", res);
      this.accounts = res;
    })
  }


}
