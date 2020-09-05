import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Account} from '../../../models/account'
import { AccountService} from '../account.service';



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
      gender: [''],
      role: ['']
    });
  }

  handleAddAccount(){
    const account:Account={
      email: this.addAccountForm.get('email').value,
      firstName: this.addAccountForm.get('firstName').value,
      lastName: this.addAccountForm.get('lastName').value,
      password: this.addAccountForm.get('password').value,
      gender: this.addAccountForm.get('gender').value,
      nameRole: this.addAccountForm.get('role').value
    };

    console.log(account);
    this.accountService.createAccount(account).subscribe((res)=>{
      console.log('res', res);
      if(res){
        this.router.navigateByUrl('/accounts')
      }
    }
    )

  }

  resetForm(){
    this.addAccountForm.reset();
  }
}
