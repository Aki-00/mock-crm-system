import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router} from '@angular/router';
import { StudentService} from '../student.service';
import { TeamService} from '../../team/team.service';
import { AccountService} from '../../account/account.service';
import { Team} from '../../../models/team';
import { Account} from '../../../models/account';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {map, startWith, ignoreElements} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-assign-to-advisor',
  templateUrl: './assign-to-advisor.component.html',
  styleUrls: ['./assign-to-advisor.component.scss'],
  providers:[DynamicDialogRef,DynamicDialogConfig]
})
export class AssignToAdvisorComponent implements OnInit {

  assignStudentForm:FormGroup;
  account = new FormControl();
  accountFilteredOptions: Observable<string[]>;
  idTeam=[];  
  checkAccount=[];
  accounts:any=[];
  fullNames=[];
  listPhoneNumberStudent;
  isDisable=false;
  selectedAccountAdvance:any[];
  filteredAccounts:any[];


  constructor(private fb:FormBuilder, private router:Router, private teamService:TeamService, private accountService:AccountService, private studentService:StudentService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig ) {
      this.listPhoneNumberStudent = studentService.getOption();
      // console.log(this.config.data);
      // console.log(this.ref)
    // this.listPhoneNumberStudent = this.config.data.checkedId;
    // console.log(this.listPhoneNumberStudent)
   }

  ngOnInit(): void {
    this.assignStudentForm = this.fb.group({
      account:['',Validators.required]
    } );

    // this.fetchAccount();
    this.accountService.getAccounts().subscribe(res=>{
      this.accounts=res;
    })

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

  // filterAccount(name: string):Team[]{
  //   console.log(this.fullNames);
  //   const filterValue = name.toString().toLowerCase();
  //   return this.accounts.filter(account => account.firstName.toLowerCase().indexOf(filterValue)=== 0);
  // }

  filterAccount(event) {
    console.log(this.accounts)
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.accounts.length; i++) {
        let account = this.accounts[i];
        if (account.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(account);
        }
    }
    
    this.filteredAccounts = filtered;
}

  displayAccount(account: Account): string {
    return account && (account.firstName + " " + account.lastName) ?(account.firstName + " " +  account.lastName) : '';
  }

  updateMySelection(e){
  
  }

  
  handleAssignStudent(){
    const account = this.assignStudentForm.get("account").value;
    const passAccounts = [];
    if (account.idAccount !=undefined){
      passAccounts.push(account.idAccount);
    }else{
      passAccounts.push(0);
    }
    console.log('account',passAccounts);
    console.log('team',this.idTeam);
    console.log('student',this.listPhoneNumberStudent);

    this.studentService.assignStudent(passAccounts, this.checkAccount, this.listPhoneNumberStudent).subscribe(
      (data) => { 
        console.log("sucess");
        Swal.fire(
          'Good job!',
          'You assigned student for advisor!',
          'success'
        )
        this.router.navigateByUrl('/students')
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

  onClose(){
    this.ref.close();
  }
}
