import { Injectable } from '@angular/core';
import { Team }  from '../../models/team';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../servives/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService{

  baseUrl = "http://139.180.133.146:8080/api/admin/v1";

  getTeams(){
    console.log(this.baseUrl);
    return this.httpGet(`${this.baseUrl}/teams`);
    // return this.http.get(`${this.url}/teams`, this.headers);
  }

  // getTeam(id){
  //   return this.http.get(`${this.url}/teams`, this.headers);
  // }

  createTeam(team: Team){
    return this.httpPost(`${this.baseUrl}/teams`,team);
  }

  getAccounts(){
    return this.httpGet(`${this.baseUrl}/accounts`);
  }

  getAccountsInTeam(idTeam){
    return this.httpGet(`${this.baseUrl}/teamDetails/?idTeam=${idTeam}`)
  }

  removeAccountsFromTeam(idTeam:number[], listIdAccount:number[]){
    return this.httpDelete(`${this.baseUrl}/teamDetails`,{idTeam, listIdAccount});
  }

  getAccountsNotInTeam(idTeam){
    return this.httpGet(`${this.baseUrl}/teamDetails/accountNotInTeam?idTeam=${idTeam}`);
  }

  addAccountToTeam(idTeam:number[], listIdAccount:number[]){
    return this.httpPost(`${this.baseUrl}/teamDetails`,{idTeam, listIdAccount});
  }
}
