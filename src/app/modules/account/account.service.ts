import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account} from '../../models/account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://moly7x.codes/api/admin/v1';
  headers = {headers: {'Content-Type': 'application/json'}};
  account= [];

  getAccounts(){
    return this.http.get(`${this.url}/accounts`, this.headers);
  }

  createAccount(account: Account){
    return this.http.post(`${this.url}/accounts`, account, this.headers);
  }

}


// private url: string = 'http://localhost:8000/api';
//   jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDdkYmI4MWQ1OWIxMTM2NTVkNjI1Y2FkMmJmY2FjMTMyOWU1Yzg0YzM0Yzk4NDZlYmM1OTg0YmQ5MTM4MzVkMDhkZGYxMjJjYWNiYWFkOTMiLCJpYXQiOjE1OTc0MTg2NTksIm5iZiI6MTU5NzQxODY1OSwiZXhwIjoxNjI4OTU0NjU5LCJzdWIiOiIxMiIsInNjb3BlcyI6W119.MzU5z-T7pBiGGNR4HL1mswITqABfCk0JRVfsItN23y2a933ahPRIw7wwUizqTYafppESP9zQntezvaZrMEGrN4AbFrj0G08odl1PVEOn-6T9l_yG8b84zmXJBLG18vL-QrI-gMAQ0yYiDxoIzhnO-8b3Lmm5bDEwkPY2IYQqSslvAYXIT5W-cO19YMl71utNI0PR-iokSUCx9nwJMbjCr7e8Q0ChP82H2z-6_1zcwnh1tJ5WRJ38Y__amUUk4pgX5oFj6MX5CRlwIS2H9pGcXNaxS73Lxwg-5-IZi3GWpiSt__N-x7dd9NFBJ-Mb7zxqTYOeD_xic_nTGGgMMpW7_uW02UxVUlxIa6vzdm-Hou-NTIa94OX6IUQ0KVZjS1Y1iRVlkNty9UGcGEBHKDU4Lt4AMZ59rBaEzMdX1FdUZeFtAVDlwWzUvxuvWQXeIhEfw73lsaQLkSSui_5lcHCxjKEu-iiQ8VzcuJfww-G1-EraxPeSdtMTeIPgJjy8a6bOrfdhkzjynu5dXPz2MVCds92h0sd0OVoBw_FNVGqffpVcgdtFA01Eyg42p2PSLvN5At7aKjzCAZ7yRnlDpcVpgwWPMChNs1kAYuOoJ-FrVl3YwoF96FH2M5IfLmnWkDZ0AwVPSr54sxSp7JzblSWBhN99BJ1wMqMHXQyxOi19Wc8';
//   headers = {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.jwt}`}};
//   products = [];

//   constructor(private http: HttpClient) { }

//   getProducts(){
//     return this.http.get(`${this.url}/products`, this.headers);
//   }
//   getProduct(id: any){
//     return this.http.get(`${this.url}/products/${id}`, this.headers);
//   }
//   createProduct(product: Product){
//     return this.http.post(`${this.url}/products`, product, this.headers);
//   }
//   product = []
//   getCategories(){
//     return this.http.get(`${this.url}/categories`, this.headers);
//   }
//   deleteProduct(id: any){
//     return this.http.delete(`${this.url}/products/${id}`, this.headers);
//   }