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
  pharmacies: any;
  serverror: boolean = false;
  pending: boolean = false;
  success: boolean = false;
  constructor(public db: AngularFirestore, public route: Router, public Uservice: UserService, public Mservice: MedicationService, public Pservice: PharmaService) {
    this.Pservice.getPharma().subscribe((el: any) => {
      this.pharmacies = el;
    })
  }
  open(item: string) {
    this.route.navigate(['admin'], { state :{ data: item}});
  }
  updateMed(item: any) {
    console.log("item", item);
    
    this.pending = true;
      // update medication
    if (Object.keys(item).length >= 6) {
      this.Mservice.Update(item).then((el: any) => {
    console.log("element", el);
        const res = el;
        this.pending = false;
        this.serverror = !el ? true : false;
        res ? this.route.navigate(['admin'], { state: { data: 'medications' } }): this.success = el;
      });
    }else {
      this.formerror = true;
    }
  }
  updatePharma(item: any) {
    this.pending = true;
    // fibase update pharmacy
    if (Object.keys(item).length >= 4) {
      this.Pservice.Update(item).then((el: any) => {
        const res = el;
        this.pending = false;
        this.success = el;
        this.serverror = !el ? true : false;
        res ? this.pharma = {} && this.route.navigate(['admin'], { state: { data: 'pharmacies' } }) : this.success = el;
      })
    }else {
      this.formerror = true;
    }
  }
  updateUser(item: any) { 
    this.pending = true;
    // fibase update user
    if (Object.keys(item).length == 7) {
      this.Uservice.Update(item).then((el: any) => {
        const res = el;
        this.pending = false;
        this.success = el;
        this.serverror = el ? false : true;
        res ? this.route.navigate(['admin'], { state: { data: 'users' } }) : this.success = true;
      })
    } else {
      this.formerror = true;
    }
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
