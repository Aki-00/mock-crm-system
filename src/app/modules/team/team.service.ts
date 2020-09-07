import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team }  from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  private url: string = 'http://139.180.133.146:8080/api/admin/v1';
  headers = {headers: {'Content-Type': 'application/json'}};

  getTeams(){
    return this.http.get(`${this.url}/teams`, this.headers);
  }

  createTeam(team: Team){
    return this.http.post(`${this.url}/teams`, team, this.headers);
  }

  getAccounts(){
    return this.http.get(`${this.url}/accounts`, this.headers);
  }

}
