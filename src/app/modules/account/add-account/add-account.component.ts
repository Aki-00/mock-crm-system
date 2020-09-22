import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Account} from '../../../models/account'
import { AccountService} from '../account.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private accountService:AccountService ) { }

  addAccountForm:FormGroup;
  reg1 = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  ngOnInit(): void {
    this.addAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.reg1)]],
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['',Validators.required],
      // role: ['']
    });
  }

  handleAddAccount(){
    const account:Account={
      email: this.addAccountForm.get('email').value,
      firstName: this.addAccountForm.get('firstName').value,
      lastName: this.addAccountForm.get('lastName').value,
      password: this.addAccountForm.get('password').value,
      gender: this.addAccountForm.get('gender').value,
      nameRole: "Adviser"
    };

    console.log(account);
    this.accountService.createAccount(account).subscribe(
      (data) => { 
        console.log("sucess");
        Swal.fire({
          title: 'Good job!',
          text: "You added account for team!",
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
      
      
  //     (res)=>{
  //     console.log('res', res);
  //     if(res){

  //          Swal.fire(
  //         'Account is created successfully',
  //         'success'
  //         )
  //       this.router.navigateByUrl('/accounts')
  //     }
  //     if(Error){
  //       console.log("fail")
  //        Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: Error.error.message,
  //       })
  //     }
  //   }
  //   )

  // }

  resetForm(){
    this.addAccountForm.reset();
  }
}
