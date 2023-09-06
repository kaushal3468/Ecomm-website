import { EventEmitter, Injectable } from '@angular/core';

// used for api call->
import {HttpClient} from '@angular/common/http'    
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
issellerloggedin= new BehaviorSubject<boolean>(false);
isLoginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
  
   this.http.post('http://localhost:3000/seller',data, {observe:'response'})
   .subscribe((result)=>{
    if(result){
    
    localStorage.setItem('seller', JSON.stringify(result.body)) 
    this.router.navigate(['seller-home'])
    }
   
   })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.issellerloggedin.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
   console.warn(data);
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}
   ).subscribe((result:any)=>{
console.warn(result);
if(result && result.body && result.body.length){
  console.log("user logged in")
  localStorage.setItem('seller', JSON.stringify(result.body)) 
  this.router.navigate(['seller-home'])
}
else{
  console.log("login failed")
  this.isLoginError.emit(true);
}
   })

   //api call will be there
  }

}
