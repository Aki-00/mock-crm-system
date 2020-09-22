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

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { AddAccountToTeamComponent } from './add-account-to-team/add-account-to-team.component';

import { MatDialogModule } from '@angular/material/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TeamService } from './team.service';

@NgModule({
  declarations: [ListTeamComponent, AddTeamComponent, TeamDetailComponent, AddAccountToTeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AccountModule,
    StoreModule.forFeature("teams", teamReducer),
    EffectsModule.forFeature([TeamEffects]),
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    DynamicDialogModule,
    AutoCompleteModule
  ],
  providers:[TeamService],
  entryComponents:[AddAccountToTeamComponent]
})
export class TeamModule { }
