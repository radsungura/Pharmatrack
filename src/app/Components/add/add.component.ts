import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  display: string = "form-med";
  med: any;
  pharma: any;
  allMed: any;
  formerror: boolean = false;
  serverror: boolean = false;
  user: any;
  constructor(public db: AngularFirestore, public route: Router, public Uservice: UserService   ) {
    this.med = {}
    this.pharma = {}
    this.user = {}
  }

  navigate(item: string, cat: string) {
    this.route.navigate(['admin'], { state: { data: cat }});
  }
  open() {
    this.route.navigate(['admin']);
  }
  save(item: {}) {

    if (Object.keys(item).length === 5) {

      // Save form data to Firestore
      this.db.collection('medications').add(item)
        .then(() => {
          alert('Form data saved successfully!');
          console.log('Form data saved successfully!');
          this.med = {};
        })
        .catch((error) => {
          console.error('Error saving form data: ', error);
        });
    }
  }
  savePharma(item: {}) {

    if (Object.keys(item).length === 5) {

      // Save form data to Firestore
      this.db.collection('pharmacies').add(item)
        .then(() => {
          alert('Form data saved successfully!');
          console.log('Form data saved successfully!');
          this.med = {};
        })
        .catch((error) => {
          console.error('Error saving form data: ', error);
        });
    }
  }
  saveUser(item: {}) {
    console.log(item);
    
    if (Object.keys(item).length === 5) {
       // localstorage
      const res = this.Uservice.Create(item);
      this.serverror = res? false: true ;
      // Save form data to Firestore
      this.db.collection('users').add(item)
        .then(() => {
          alert('Form data saved successfully!');
          console.log('Form data saved successfully!');
          this.med = {};
        })
        .catch((error) => {
          console.error('Error saving form data: ', error);
        });
    }
    else {
      this.formerror = true;
    }
  }
  editMed() {
    this.db.collection('medications').valueChanges().subscribe((el: any) => {
      this.allMed = el;
    console.log("medication", this.allMed);

     })
    
  }
  ngOnInit() {
    this.display = history.state.data ? history.state.data : '';
  }
}
