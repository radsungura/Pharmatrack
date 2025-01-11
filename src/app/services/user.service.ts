import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    { name: 'rad', type: "user", tel: '61 607 690',  fullname: 'Aime RUKUNDO', email: 'rukundaime@gmail.com', pass: '123' },
    { name: 'diacre', type: "user", tel: '61 607 690',  fullname: 'Diacre RUKUNDO', email: 'rukunddiacre@gmail.com', pass: '123' },
    { name: 'lion', type: "admin", tel: '61 607 690',  fullname: 'Lion RUKUNDO', email: 'rukundolion@gmail.com', pass: '123' }
  ]
  constructor(public route: Router, private afAuth: AngularFireAuth, private db: AngularFirestore ) { }
  
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
  getUsers() {
    const data =  localStorage.getItem('medusers');
    const res = data? JSON.parse(data): {};
    return res;
  }
  getById(item: any) {
    const res = this.getUsers();
    const data = res ? res.find((el: any) => { el.name == item.name }) : '';
    return data;
  }
  Create(item: any) {
  // localstorage
    let users: any = [];
    let success = true;
    const res = this.getUsers()
    const data: any = res;
    if (data) {
      users = data;
      users.push(item);
    }
    else {
      users.push(item);
    }
    try {
      localStorage.setItem('medusers', JSON.stringify(users));
    }
    catch (error) {
      console.log("MedError", error);
      success = false;
    }
    return success;
  //firebasestorage
    // this.db.collection('users');  
  }
  Delete(item: any) {
    this.db.collection('users').doc(item.Id).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }
  Update(item: any) {
    
  }
}
