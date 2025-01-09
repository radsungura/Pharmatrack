import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    { name: 'rad', type: "user",  fullname: 'Aime RUKUNDO', email: 'rukundaime@gmail.com', pass: '123' },
    { name: 'diacre', type: "user",  fullname: 'Diacre RUKUNDO', email: 'rukunddiacre@gmail.com', pass: '123' },
    { name: 'lion', type: "admin",  fullname: 'Lion RUKUNDO', email: 'rukundolion@gmail.com', pass: '123' }
  ]
  constructor(public route: Router, private afAuth: AngularFireAuth ) { }
  
  login(item: any) {
    let error = false;
    const connect = item;
    const check = this.users.find(el =>  el.name == connect.name && el.pass == connect.pass);

    if (check) {
      localStorage.setItem('meduser', JSON.stringify(check));
      alert("Successfull connected !");
      this.route.navigate(['dashboard']);
      error = false;
    } else {
      error = true;
    }
    return error;
  }

  // async Login(item: any) {
  //   let error: boolean = false;
  //   try {
  //     const userCredential = await this.afAuth.signInWithEmailAndPassword(item.email, item.password);
  //     console.log('Logged in:', userCredential);
  //     this.route.navigate(['/home']);  // Navigate to the home page after login
  //     error = false;
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     error = true;
  //   }
  //   return error;

  // }

  logout() {
    const decision = confirm('You are about to logout !');
    if (decision) {
      localStorage.removeItem('meduser');
    } else {
      
    }
  }
  getUser() {
    const data: any = localStorage.getItem('meduser');
    const user = JSON.parse(data);    
    return user;
  }
  getLoged() {
    const loged = localStorage.getItem('meduser');
    if (loged) {
      return true;
    } else {
      return false;
    }
  }
}
