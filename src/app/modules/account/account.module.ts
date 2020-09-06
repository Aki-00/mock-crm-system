import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { accountReducer } from './state/account.reducer';
import { AccountEffects } from './state/account.effects';
import { EffectsModule } from '@ngrx/effects';

import { AccountRoutingModule } from './account-routing.module';
import { ListAccountComponent } from './list-account/list-account.component';
import { AddAccountComponent } from './add-account/add-account.component';



@NgModule({
  declarations: [ListAccountComponent,AddAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('accounts', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountModule { }
