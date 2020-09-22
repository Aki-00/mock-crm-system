import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { StudentService} from '../student.service';
import { TeamService} from '../../team/team.service';
import { AccountService} from '../../account/account.service';
import { Team} from '../../../models/team';
import { Account} from '../../../models/account';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {map, startWith, ignoreElements} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.scss']
})
export class AssignStudentComponent implements OnInit {

  assignStudentForm:FormGroup;
  team = new FormControl();
  account = new FormControl();
  accountFilteredOptions: Observable<string[]>;
  // accountFilteredOptions: BehaviorSubject<any[]> = new BehaviorSubject(undefined);
  teamFilteredOptions : Observable<string[]>;
  teams=[];
  checkAccount=[];
  accounts:any=[];
  fullNames=[];
  listPhoneNumberStudent;
  isDisable=false;
  filteredTeams:any[];

  constructor(private fb:FormBuilder, private router:Router, private teamService:TeamService, private accountService:AccountService, private studentService:StudentService ) {
    this.listPhoneNumberStudent = studentService.getOption();
    console.log(this.listPhoneNumberStudent)
   }

  ngOnInit(): void {
    this.assignStudentForm = this.fb.group({
      team:['',Validators.required],
      account:['']
    } );

    this.fetchTeam();

    // this.fetchAccount();

  }

  onChanges(){
    this.assignStudentForm.get('team').valueChanges.subscribe(value =>{
      if(value ==null){
        this.isDisable = false;
      }
      else{
        this.isDisable = true;
      }
    })
  }


  fetchTeam(){
    this.teamService.getTeams().subscribe(res=>{
      this.teams=res;
    })

  }

  // filterTeam(name: string):Team[]{
  //   console.log(this.teams);
  //   const filterValue = name.toString().toLowerCase();
  //   return this.teams.filter(team => team.teamName.toLowerCase().indexOf(filterValue)=== 0);
  // }

  filterTeam(event) {
    console.log(this.teams)
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.teams.length; i++) {
        let team = this.teams[i];
        if (team.teamName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(team);
        }
    }
    
    this.filteredTeams = filtered;
}


fetchAccount(){
    this.accountService.getAccounts().subscribe(res=>{
      this.accounts=res;
      this.fullNames = this.accounts.map(a=>a.firstName + a.lastName);
      this.accountFilteredOptions=this.assignStudentForm.get("account").valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstName),
      map(name => name ? this.filterAccount(name) : this.accounts.slice())
    );
    })

  }

  filterAccount(name: string):Team[]{
    console.log(this.fullNames);
    const filterValue = name.toString().toLowerCase();
    return this.accounts.filter(account => account.firstName.toLowerCase().indexOf(filterValue)=== 0);
  }
  //using search api
  // fetchAccount(){
  //     this.assignStudentForm.get("account").valueChanges.subscribe(data =>{
  //       if (typeof data === 'string' && data.trim() !== ''){
  //         this.filterAccount(data);
  //       }
  //     }) 
  // }

  // filterAccount(name){
  //   const filterValue = name.toString().toLowerCase();
  //   this.teamService.searchAccount(name).subscribe(res=>{
  //     this.accountFilteredOptions = res;
  //     console.log(this.accountFilteredOptions);
  //   })
  // }

  displayTeam(team: Team): string {
    return team && team.teamName ? team.teamName : '';
  }

  displayAccount(account: Account): string {
    return account && (account.firstName + " " + account.lastName) ?(account.firstName + " " +  account.lastName) : '';
  }

  updateMySelection(e){
    // const teamInput = this.assignStudentForm.get('team');
    // const accountInput = this.assignStudentForm.get('account');

    // if(e.value ==null){
    //   accountInput.enable();
    // }else{
    //   accountInput.disable();
    // }
  }

  checkTeam(e){
    const teamInput = this.assignStudentForm.get('team');
    const accountInput = this.assignStudentForm.get('account');

    if(e.value ==null){
      accountInput.enable();
    }else{
      accountInput.disable();
    }
  }

  checkInputAccount(e){
    const teamInput = this.assignStudentForm.get('team');
    const accountInput = this.assignStudentForm.get('account');

    if(e.value ==null){
      teamInput.enable();
    }else{
      teamInput.disable();
    }
  }

  handleAssignStudent(){
    const team = this.assignStudentForm.get("team").value;
    const passTeams = [];
    if (team.idTeam !=undefined){
      passTeams.push(team.idTeam);
    }else{
      passTeams.push(0);
    }
    console.log('team',passTeams);
    console.log('account',this.checkAccount);
    console.log('student',this.listPhoneNumberStudent);

    this.studentService.assignStudent(passTeams, this.checkAccount, this.listPhoneNumberStudent).subscribe(
      (data) => { 
        console.log("sucess");
        Swal.fire({
          title: 'Good job!',
          text: "You assigned student for team!",
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
      }, 
      (error) => {
        console.log("err", error.error.message); 
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
