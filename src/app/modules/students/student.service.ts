import { Injectable } from '@angular/core';
import { Team }  from '../../models/team';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../servives/base.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http'  

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{

  baseUrl =  environment.BASE_URL
  private data ={};
  
  getStudents(){
    return this.httpGet(`${this.baseUrl}/students`);
  }

  searchAccount(search){
    return this.httpGet(`${this.baseUrl}/accounts/search?search=/${search}`);
  }

  setOption(option, value) {      
    this.data= value;  
  }  
  
  getOption() {  
    return this.data;  
  } 
  
  assignStudent(idTeam,idAccount,listPhoneNumberStudent){
    return this.httpPost(`${this.baseUrl}/students/divto`,{idTeam,idAccount,listPhoneNumberStudent});
  }

  UploadExcel(formData: FormData) {  
    return this.httpPostFile(`${this.baseUrl}/students`,formData);
  } 
}  