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
  constructor(public db: AngularFirestore, public route: Router, public Uservice: UserService, public Pservice: PharmaService,public Mservice: MedicationService   ) {
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
  saveMed(item: any) {
    if (Object.keys(item).length == 6) {
      if (this.Mservice.getMed()) {
        this.exist = this.Mservice.getMed().find((el: any) => el.code === item.code )? true : false;
      }
      if (this.exist) {
        return
      }
      else {
        const res = this.Mservice.Create(item);
        this.serverror = res ? false: true;
        this.med = this.serverror? this.med: {};
      }
    }
    else {
      this.formerror = true;
    }
    return this.formerror || this.serverror ? false : true;
  }
  savePharma(item: any) {
    if (Object.keys(item).length == 4) {
      if (this.Pservice.getPharma()) {
        this.exist = this.Pservice.getPharma().find((el: any) => el.code === item.code) ? true : false;
        if (this.exist) {
          return
        }
        else {
          const res = this.Pservice.Create(item);
          this.serverror = res ? false : true;
          this.pharma = this.serverror? this.pharma: {};
        }
      }
    }
    else {
      this.formerror = true;
    }   
  }
  saveUser(item: any) {
    if (Object.keys(item).length == 7) {
      if (this.Uservice.getUsers()) {
        this.exist = this.Uservice.getUsers().find((el: any) => el.name === item.name) ? true : false;
        if (this.exist) {
          return
        }
        else {
          const res = this.Uservice.Create(item);
          this.serverror = res ? false : true;
          this.user = this.serverror? this.user: {};
        }
      }
    }
    else {
      this.formerror = true;
    } 
  }
  ngOnInit() {
    this.display = history.state.data ? history.state.data : '';
    this.pharmacies = this.Pservice.getAll();
  }
}
