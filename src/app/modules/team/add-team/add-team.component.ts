import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { TeamService} from '../team.service';
import { Team} from '../../../models/team'
import { Store, select } from '@ngrx/store';
import { Account} from '../../../models/account';
import * as teamActions from '../state/team.actions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
 
  constructor(private fb:FormBuilder, private router:Router, private teamService:TeamService, private store: Store) {  
   }

  addteamForm:FormGroup;
  reg1 = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  // accounts =[];
  // emails = [];
  
  ngOnInit(): void {
    this.addteamForm = this.fb.group({
      teamName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.reg1)]]
    });

    // this.teamService.getAccounts().subscribe((res:any) =>{
    //   this.accounts = res;
    //   this.emails = this.accounts.map(a=>a.email);
    //   console.log(this.emails);
    // })

  }

  handleAddTeam(){
    const team:Team={
      teamName: this.addteamForm.get('teamName').value,
      email: this.addteamForm.get('email').value
    };

    console.log(team);
    this.store.dispatch(new teamActions.CreateTeam(team));

    this.store.pipe(select((state: any) => state.teams.error)).subscribe((res) => {
      console.log("res",res)
      if(res){
        console.log("res",res.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.error.message,
        })
      }
      else{
        this.router.navigateByUrl('/teams')
      }
    })

    // this.teamService.createTeam(team).subscribe((res)=>{
    //   console.log('res', res);
    //   if(res){
    //     this.router.navigateByUrl('/teams')
    //   }
    // }
    // )
  }

  resetForm(){
    this.addteamForm.reset();
  }

}
