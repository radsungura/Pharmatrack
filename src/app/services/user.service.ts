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
  async login(item: any) {
    item.email = item.name;
    item.password = item.pass;
    let error: boolean = false;
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(item.email, item.password);
      console.log('Logged in:', userCredential);
      localStorage.setItem("meduser", JSON.stringify(userCredential));

      this.route.navigate(['/dashboard']);  // Navigate to the home page after login
      error = false;
    } catch (error) {
      console.error('Error logging in:', error);
      error = true;
    }
    return error;
  }
  logout() {
    const decision = confirm('You are about to logout !');
    if (decision) {
      localStorage.removeItem('meduser');
      this.route.navigate(['dashboard']);
      window.location.reload()
    } else {
      
    }
  }
  getUser() {
    const data: any = localStorage.getItem('meduser');
    const res = data? JSON.parse(data): {};
    return res;
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
    return  this.db.collection('users').valueChanges()
  }
  getById(item: any) {
    return this.db.collection('users').doc(item).valueChanges();
  }
  async Create(item: any) {
    item.uid = item.name;
      return this.afAuth.createUserWithEmailAndPassword(item.mail, item.pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user", userCredential);
      // Store user data in Firestore
      return this.db.collection('users').doc(user?.uid).set(item)
        .then(() => {
          return true;
        }).catch((error) => {
          console.error('Error saving form data: ', error);
          return false;
        });
    })
    .then(() => {
      // Redirect to a dashboard after successful registration
      this.route.navigate(['/dashboard']);
      return true;
    })
    .catch(error => {
      if (error.code) {
        // this.handleError(error);
        return false;
      } else {
        return false
        console.error('Unexpected error:', error);
      }
    });
  }
  Delete(item: any) {
    // delete user
    return this.db.collection('users').doc(item.name).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }
  Update(item: any) {
    return this.db.collection('users').doc(item.name).update(item).then(() => {
      console.log('Form data saved successfully!');
      return true;
    })
    .catch((error) => {
      console.error('Error saving form data: ', error);
      return false;
    });
  }
  Display(item: string) {
    const display = item;
    return display;
  }
  private handleError(error: any): void {
    // Common Firebase Error codes
    switch (error.code) {
      case 'auth/email-already-in-use':
        alert('Email already in use. Please choose another one.');
        break;
      case 'auth/invalid-email':
        alert('Please enter a valid email address.');
        break;
      case 'auth/weak-password':
        alert('Password should be at least 6 characters.');
        break;
      default:
        alert('An unexpected error occurred: ' + error.message);
        break;
    }
  }
}
