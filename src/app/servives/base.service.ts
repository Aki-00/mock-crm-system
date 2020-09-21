import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';  
// import { TokenType } from '../constants/token_types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // getToken(){
  //   return localStorage.getItem(TokenType.accessToken);
  // }
  // getHeaders(){
  //   return {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}`}};
  // }

  getHeaders(){
    return {headers: {'Content-Type': 'application/json'}};
  }

  getHeaderFile(){
    return {headers: {'Content-Type': 'multipart/form-data'}};
  }

  constructor(private http: HttpClient) { }

  httpGet(url: string): Observable<any>{
    return this.http.get(url, this.getHeaders());
  }
  httpPost(url: string, body?: any){
    return this.http.post(url, body, this.getHeaders());
  }
  httpPut(url: string, body?: any){
    return this.http.post(url, body, this.getHeaders());
  }

  httpDelete(url: string, body?:any){
    const options ={
      headers: this.getHeaders,
      body:body
    }
    return this.http.request('DELETE',url, {
      headers:{'Content-Type': 'application/json'},
      body: body
  }); 
}

    httpPostFile(url:string, body?:any){
      let headers = new HttpHeaders();  
  
    headers.append('Content-Type', 'multipart/form-data');  
    headers.append('Accept', 'application/json');  
  
    const httpOptions = { headers: headers };  

  return this.http.post(url,body,httpOptions);
}
}