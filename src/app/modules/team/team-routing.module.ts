import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTeamComponent } from './list-team/list-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamDetailComponent} from './team-detail/team-detail.component';
import { AddAccountToTeamComponent} from './add-account-to-team/add-account-to-team.component';

const routes: Routes = [
  {
    path:'',
    component:ListTeamComponent
  },
  {
    path:'add',
    component:AddTeamComponent
  },
  {
    path:'detail/:id',
    component:TeamDetailComponent
  },
  {
    path:'detail/:id/add',
    component:AddAccountToTeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
