import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTeamComponent } from './list-team/list-team.component';
import { AddTeamComponent } from './add-team/add-team.component';

const routes: Routes = [
  {
    path:'',
    component:ListTeamComponent
  },
  {
    path:'add',
    component:AddTeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
