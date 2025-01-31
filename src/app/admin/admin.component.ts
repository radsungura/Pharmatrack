import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from '../services/medication.service';
import { Location } from '@angular/common';
import { PharmaService } from '../services/pharma.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  med: any;
  display: string = 'medications';
  pharma: any;
  users: any;
constructor(public route: Router, public Mservice: MedicationService,public Uservice: UserService, public Pservice: PharmaService, public location: Location) {
  this.Pservice.getPharma().subscribe((el: any) => {
    this.pharma = el;
  });
  this.Mservice.getMed().subscribe((el: any) => {
    this.med = el;
  });
  this.Uservice.getUsers().subscribe((el: any) => {
    this.users = el;
  });
  this.display = 'medications';
  }
  
  add(item: string) {
    this.route.navigate(['add'], {state: { data: item }});
  }
  details(item: any) {
  item.cat = "med";
  this.route.navigate(['details'], {
    state: { data: item }
  });
  }
  Medit(item: any) {
    item.cat = "med";
    this.route.navigate(['edit'], {
      state: { data: item }
    });
  }
  Mdelete(item: any) {
    const decision = confirm("You are about to detete" + item.name + "!");
    if (decision) {
      this.Mservice.Delete(item).then((el: any) => {
        el ? this.med = this.Mservice.getMed() : this.med;
      });
    }
  }
    // pharmacy
  Pdetails(item: any) {
    item.cat = "pharma";
    this.route.navigate(['details'], {
      state: { data: item }
    });
  }
  Pedit(item: any) {
    item.cat = "pharma";
    this.route.navigate(['edit'], {
      state: { data: item }
    });
  }
  Pdelete(item: any) {
    const decision = confirm(" You are about to detete " + item.name + " !"); 
    if (decision) {
      this.Pservice.Delete(item).then((res: any) => {
      res ? this.pharma = this.Pservice.getPharma() : this.pharma;
    });
    } else {
    }
  }
  Udetails(item: any) {
    item.cat = "user";
    this.route.navigate(['details'], {
      state: { data: item }
    });
  }
  Uedit(item: any) {
    item.cat = "user";
    this.route.navigate(['edit'], {
      state: { data: item }
    });
  }
  Udelete(item: any) {
    const decision = confirm(" You are about to detete " + item.name + " !"); 
    if (decision) { 
      this.Uservice.Delete(item.name).then((el: any) => {
        el ? this.users = this.Uservice.getUsers() : this.users;
      });
    }
    else {
    }
  }
  // navigation
  navigate(item: string, cat: string) {
    this.route.navigate([item], {state: { data: cat }});
  }
  goBack() {
    this.location.back(); // Utilisation du service Location pour revenir en arrière dans l'historique
  }
  open(item: string) {
    this.display = item;
  }
  ngOnInit() {
    this.display = history.state.data? history.state.data: 'medications';
    console.log(this.display);
    
  }
}
