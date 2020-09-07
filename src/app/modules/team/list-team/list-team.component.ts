import { Component, OnInit } from '@angular/core';
import { Team} from '../../../models/team';
import { TeamService} from '../team.service';
import { Store, select } from '@ngrx/store';
import * as teamActions from '../state/team.actions'; 

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent implements OnInit {

  constructor(private teamService:TeamService, private store:Store) { }
  teams=[];

  ngOnInit(): void {

    this.store.dispatch(new teamActions.LoadTeams());
    this.store.pipe(select((state: any) => state.teams)).subscribe((res) => {
      console.log("res",res)
      if(res.data.teams){
        this.teams = res.data.teams
      }
    })

    // this.teamService.getTeams().subscribe((res:any)=>{
    //   this.teams=res;
    // })
  }

}
