import { Component, OnInit } from '@angular/core';
import { Account} from '../../../models/account';
import { TeamService} from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Inject } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-account-to-team',
  templateUrl: './add-account-to-team.component.html',
  styleUrls: ['./add-account-to-team.component.scss'],
  providers:[DynamicDialogRef,DynamicDialogConfig]
})
export class AddAccountToTeamComponent implements OnInit {

  constructor(private teamService:TeamService, private router: ActivatedRoute,private _router:Router, public ref: DynamicDialogRef, public config: DynamicDialogConfig)
 { 
    }

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
            title: message.message,
            text: message.details,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          })
          
          // Swal.fire({
          //   icon: 'warning',
          //   title: message.message,
          //   text: message.details,
          // })  
        };
        if(message.message=="SUCCESS"){
          Swal.fire({
            title: message.message,
            text: message.details,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          })


          
        };
      
      }, 
      (error) => {
        Swal.fire({
          title: 'Oops...',
          text: error.error.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })

      });
  }
}
