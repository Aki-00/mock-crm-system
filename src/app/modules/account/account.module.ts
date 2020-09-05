import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { ListAccountComponent } from './list-account/list-account.component';
import { AddAccountComponent } from './add-account/add-account.component';


@NgModule({
  declarations: [ListAccountComponent,AddAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountModule { }
