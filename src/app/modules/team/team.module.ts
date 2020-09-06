import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { teamReducer } from './state/team.reducer';
import { TeamEffects } from './state/team.effects';
import { EffectsModule } from '@ngrx/effects';
import { accountReducer } from '../account/state/account.reducer';
import { AccountModule} from '../account/account.module'

import { TeamRoutingModule } from './team-routing.module';
import { ListTeamComponent } from './list-team/list-team.component';
import { AddTeamComponent } from './add-team/add-team.component';


@NgModule({
  declarations: [ListTeamComponent, AddTeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AccountModule,
    StoreModule.forFeature("teams", teamReducer),
    EffectsModule.forFeature([TeamEffects])
  ]
})
export class TeamModule { }
