import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { DefaulLayoutComponent} from './containers/defaul-layout/defaul-layout.component'

const routes: Routes = [
 
  {
    path:'',
    component: DefaulLayoutComponent,
    children:[
      {
        path:'accounts',
        loadChildren:()=> import("./modules/account/account.module").then(m => m.AccountModule)
      },
      {
        path:'teams',
        loadChildren:()=> import("./modules/team/team.module").then(m => m.TeamModule)
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
