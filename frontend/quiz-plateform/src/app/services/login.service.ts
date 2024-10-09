import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  login(userData:any){
     return this.http.post(`${baseUrl}/login`,userData);
  }

  generatejwtTokenStatus(token:any){
    return this.http.get(`${baseUrl}/jwt-token-status/${token}`,);
 }

  loginUser(token: any){
    localStorage.setItem("token",token);
    
    return true;
  }

  IsloggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==null||tokenStr==''||tokenStr==undefined){
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  setUserDetails(user:any){
    localStorage.setItem("user",JSON.stringify(user));
    return true;
  }

  getUserDetails(){
    let userdetailsStr=localStorage.getItem("user");
    if(userdetailsStr!=null){
    return JSON.parse(userdetailsStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  getUserAuthority(): string | null {
    const user = this.getUserDetails();
    if (user && user.role) {
      return user.role.rolename; // Assuming role object has rolename property
    }
    return null;
  }
  
}
