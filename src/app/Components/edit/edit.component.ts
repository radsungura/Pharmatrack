import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MedicationService } from 'src/app/services/medication.service';
import { PharmaService } from 'src/app/services/pharma.service';

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
  user: any;
  userError: boolean = false;
  origin: any;
  params: any;
  formerror: boolean = false;

  constructor(public db: AngularFirestore, public route: Router, public Uservice: UserService, public Mservice: MedicationService, public Pservice: PharmaService){}
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
  UpdateMed(item: any) {
      // update medication in localstorage
    const res = this.Mservice.Update(item);
    res? this.route.navigate(['admin'], { state :{ data: 'medications'}}): this.formerror = true;
  }
   UpdatePharma(item: any) {
      // update medication in localstorage
    const res = this.Pservice.Update(item);
    res? this.route.navigate(['admin'], { state :{ data: 'pharmacies'}}): this.formerror = true;
     
  }
  saveUser(item: any) { 
   const res = this.Uservice.Update(item);
    res? this.route.navigate(['admin'], { state :{ data: 'users'}}): this.formerror = true;
  }
  ngOnInit() {
    this.params = history.state.data;
    if (this.params.cat == 'med') {
      this.med = this.params;
      this.display = 'medications';
    }
    else if (this.params.cat == 'pharma') {
      this.pharma = this.params
      this.display = 'pharmacy';
    }
    else if(this.params.cat == 'user'){
      this.user = this.params
      this.display = 'user';
    }
  }
}
