import { Component, OnInit } from '@angular/core';
import { Team} from '../../../models/team';
import { TeamService} from '../team.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent implements OnInit {

  constructor(private teamService:TeamService) { }
  teams=[];

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((res:any)=>{
      this.teams=res;
    })
  }

}
