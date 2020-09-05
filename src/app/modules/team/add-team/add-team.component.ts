import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { TeamService} from '../team.service';
import { Team} from '../../../models/team'

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private teamService:TeamService) { }

  addteamForm:FormGroup
  emails=["an@gmail.com", "linh@gmail.com"];

  ngOnInit(): void {
    this.addteamForm = this.fb.group({
      teamName: ['', Validators.required],
      email: ['',Validators.required]
    });
  }
  
  // changeEmail(e) {
  //   this.email.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  handleAddTeam(){
    const team:Team={
      teamName: this.addteamForm.get('teamName').value,
      email: this.addteamForm.get('email').value
    };

    console.log(team);
    this.teamService.createTeam(team).subscribe((res)=>{
      console.log('res', res);
      if(res){
        this.router.navigateByUrl('/teams')
      }
    }
    )


  }

  resetForm(){
    this.addteamForm.reset();
  }
}
