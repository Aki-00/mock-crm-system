import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamRoutingModule } from './team-routing.module';
import { ListTeamComponent } from './list-team/list-team.component';
import { AddTeamComponent } from './add-team/add-team.component';


@NgModule({
  declarations: [ListTeamComponent, AddTeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TeamModule { }
