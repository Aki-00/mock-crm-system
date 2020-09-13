import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { TeamService} from '../team.service';
import { Team} from '../../../models/team'
import { Store, select } from '@ngrx/store';
import { Account} from '../../../models/account';
import * as teamActions from '../state/team.actions'
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
 
  constructor(private fb:FormBuilder, private router:Router, private teamService:TeamService, private store: Store) {  
   }

  addteamForm:FormGroup;
  email = new FormControl();
  reg1 = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  accounts =[];
  emails = [];
  filteredOptions: Observable<string[]>;

  
  ngOnInit(): void {
    this.addteamForm = this.fb.group({
      teamName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.reg1)]]
    });

    this.teamService.getAccounts().subscribe((res:any) =>{
      this.accounts = res;
      this.emails = this.accounts.map(a=>a.email);

      this.filteredOptions = this.addteamForm.get("email").valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    })
  }
//Filter email
  private _filter(value: string): string[] {
    console.log(this.emails);
    const filterValue = value.toString().toLowerCase();
    return this.emails.filter(email => email.toLowerCase().includes(filterValue));
  }

  handleAddTeam(){
    const team:Team={
      teamName: this.addteamForm.get('teamName').value,
      email: this.addteamForm.get('email').value
      // email:this.email
    };

    console.log(team);
    // this.store.dispatch(new teamActions.CreateTeam(team));

    this.teamService.createTeam(team).subscribe(
      (data) => { 
        console.log("sucess");
        Swal.fire(
          'Good job!',
          'You created an team!',
          'success'
        )
        this.router.navigateByUrl('/teams')
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

    updateMySelection(value){
      this.email = value;
      console.log(this.email)
    }
      
      
      // (res) => {
      // console.log("res",res)
      // if(res=!null){
      //   console.log("res",res.error);
      //   console.log("Fail");
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: res.error.message,
        // })
      // }
      // else{
        // Swal.fire(
        //   'The Internet?',
        //   'That thing is still around?',
        //   'success'
        // ).then((result)=>
        // {
        //   console.log("sucess");
        //   this.router.navigateByUrl('/teams');
        // }         
        // ) 
    //     console.log("sucess");   
    //   }
    // })

    // this.teamService.createTeam(team).subscribe((res)=>{
    //   console.log('res', res);
    //   if(res){
    //     this.router.navigateByUrl('/teams')
    //   }
    // }
    // )
  // }

  resetForm(){
    this.addteamForm.reset();
  }

}
