import { Component, OnInit } from '@angular/core';
import { Account} from '../../../models/account';
import { TeamService} from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddAccountToTeamComponent } from '../add-account-to-team/add-account-to-team.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  constructor(private teamService:TeamService, private router: ActivatedRoute, private dialog: MatDialog ) { }
  accounts:Account[];
  selectedItemsList = [];
  checkedIDs = [];
  idTeams =[];
  idTeam:number;
  teamName:string;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.router.params.subscribe((res: any) => {
      this.idTeams=[];
      this.idTeam = res.id;
      this.idTeams.push(this.idTeam);
      this.teamService.getAccountsInTeam(this.idTeam).subscribe((res: any) => {
        console.log(res)
       this.accounts = res.teamMember;
       this.teamName = res.teamInfo.teamName;

       this.accounts.forEach(a=>
       console.log(a.roleInTeam))
      //  this.fetchSelectedItems();
       this.fetchCheckedIDs();       
      })     
    });
  }

  changeSelection() {
    this.fetchCheckedIDs()
  }


  // fetchSelectedItems() {
  //   this.selectedItemsList = this.accounts.filter((value, index) => {
  //     return value.isChecked
  //   });
  // }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.accounts.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.idAccount);
      }
    });    
  }

  removeAccounts(){
    console.log("idTeam",this.idTeam);
    console.log("idTeams",this.idTeams);
    console.log("checked",this.checkedIDs);
    this.teamService.removeAccountsFromTeam(this.idTeams,this.checkedIDs).subscribe(
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
        this.fetchData();
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

  getColor(role){
    switch (role){
      case 'Leader':
        return 'blue';
      case 'Member':
        return 'black'
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = this.accounts;

    this.dialog.open(AddAccountToTeamComponent, dialogConfig);
}

}
