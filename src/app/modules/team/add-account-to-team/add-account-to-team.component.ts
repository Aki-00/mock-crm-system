import { Component, OnInit } from '@angular/core';
import { Account} from '../../../models/account';
import { TeamService} from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account-to-team',
  templateUrl: './add-account-to-team.component.html',
  styleUrls: ['./add-account-to-team.component.scss']
})
export class AddAccountToTeamComponent implements OnInit {

  constructor(private teamService:TeamService, private router: ActivatedRoute,private _router:Router) { }
  accounts:Account[];
  selectedItemsList = [];
  checkedIDs = [];
  idTeams =[];
  idTeam:number;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.router.params.subscribe((res: any) => {
      this.idTeam = res.id;
      this.idTeams.push(this.idTeam);
      this.teamService.getAccountsNotInTeam(this.idTeam).subscribe((res: any) => {
       this.accounts = res;
       this.fetchCheckedIDs();  
      })     
    });
  }

  changeSelection() {
    this.fetchCheckedIDs()
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.accounts.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.idAccount);
      }
    });    
  }

  addAccount(){
    this.teamService.addAccountToTeam(this.idTeams,this.checkedIDs).subscribe(
      (message:any) => { 
        console.log(message);
        if(message.message=="WARNING"){
          Swal.fire({
            icon: 'warning',
            title: message.message,
            text: message.details,
          })  
        };
        if(message.message=="SUCCESS"){
          Swal.fire({
            icon: 'success',
            title: message.message,
            text: message.details,
          }) 
        };
        this._router.navigateByUrl(`/teams/detail/${this.idTeam}`)
      }, 
      (error) => {
        console.log("err", error.error.message); 
        Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.error.message,
                })  
      });
  }
}
