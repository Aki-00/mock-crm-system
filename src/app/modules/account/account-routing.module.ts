import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAccountComponent } from './list-account/list-account.component';
import { AddAccountComponent } from './add-account/add-account.component';

const routes: Routes = [
  {
    path:'',
    component:ListAccountComponent
  },
  {
    path:'add',
    component:AddAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
