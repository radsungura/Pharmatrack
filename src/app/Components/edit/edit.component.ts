import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
display: string = "form-med";
  med: any;
  pharma: any;
  allMed: any;
  constructor(public db: AngularFirestore, public route: Router){}
   open(item: string) {
    this.route.navigate(['admin'], { state :{ data: item}});
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
  editMed() {
    this.db.collection('medications').valueChanges().subscribe((el: any) => {
      this.allMed = el;
      console.log("medication", this.allMed);
     })
  }
  ngOnInit() {
    const params = history.state.data;
    console.log("pamas", params);
    if (params.cat == 'med') {
      this.med = params
      this.display = 'medications';
    } else if(params.cat == 'pharma'){
      this.pharma = params
      this.display = 'pharmacy';
    }
  }
}
