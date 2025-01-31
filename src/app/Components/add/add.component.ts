import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PharmaService } from 'src/app/services/pharma.service';
import { MedicationService } from 'src/app/services/medication.service';

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
  pharmacies: any;
  exist: boolean = false;
  users: any;
  medications: any;
  saveBtn: boolean = false;
  pending: boolean = false;
  success: boolean = false;
  constructor(public db: AngularFirestore, public route: Router, public Uservice: UserService, public Pservice: PharmaService,public Mservice: MedicationService   ) {
    this.med = {}
    this.pharma = {}
    this.user = {}
    this.Pservice.getPharma().subscribe((el: any) => {
      this.pharmacies = el;
    })
    this.Mservice.getMed().subscribe((el: any) => {
      this.medications = el;
    })
    this.Uservice.getUsers().subscribe((el: any) => {
      this.users = el;
    })
  }
  navigate(item: string, cat: string) {
    this.route.navigate(['admin'], { state: { data: cat }});
  }
  open() {
    this.route.navigate(['admin']);
  }
  checkCode(item: string, cat: string) {

    if (this.medications && cat == 'medication') {
      this.exist = this.medications.find((el: any) => el.code === item);
      if (this.exist) {
        this.exist = true;
        this.saveBtn = true;
      } else {
        this.saveBtn = false;
      }
    }
    if (this.pharmacies && cat == 'pharmacy') {
      this.exist = this.pharmacies.find((el: any) => el.code === item);
      if (this.exist) {
        this.exist = true;
        this.saveBtn = true;
      } else {
        this.saveBtn = false;
      }
    }
    if (this.users && cat == 'user') {
      console.log("user item", item);
      
      this.exist = this.users.find((el: any) => el.name === item);
      if (this.exist) {
        this.exist = true;
        this.saveBtn = true;
      } else {
        this.saveBtn = false;
      }
    }
  }
  saveMed(item: any) {
    if (Object.keys(item).length == 6) {
    this.pending = true;
      this.Mservice.Create(item).then((el: any) => {
        this.pending = false;
        this.success = el;
        this.serverror = el ? false : true;
        this.med = el? {}: this.med;
      });
    }
    else {
      this.formerror = true;
    }
  }
  savePharma(item: any) {
    if (Object.keys(item).length == 4) {
    this.pending = true;
      this.Pservice.getPharma().subscribe((data: any) => {
        this.Pservice.Create(item).then((el: any) => {
          this.pending = false;
          this.success = el;
          this.serverror = el ? false : true;
          this.pharma = !el ? this.pharma : {};
        });
      });
    }
    else {
      this.formerror = true;
    }   
  }
  saveUser(item: any) {
    if (Object.keys(item).length >= 7) {
    this.pending = true;
     this.Uservice.getUsers().subscribe((data: any) => {
        const el = this.Uservice.Create(item).then((el: any) => {
          this.pending = false;
          this.success = el;
          this.serverror = el? false : true;
          this.user = !el ? this.user : {};
        })
      })
    }
    else {
      this.formerror = true;
    } 
  }
  ngOnInit() {
    this.display = history.state.data ? history.state.data : '';
  }
}
