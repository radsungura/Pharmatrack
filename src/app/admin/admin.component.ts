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
  display: string;
  pharma: any;
  users: any;
constructor(public route: Router, public Mservice: MedicationService,public Uservice: UserService, public Pservice: PharmaService, public location: Location) {
  this.med = this.Mservice.getMed();
  this.users = this.Uservice.getUsers();
  this.pharma = this.Pservice.getAll();
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
      const res = this.Mservice.Delete(item);
      res ? this.med = this.Mservice.getMed() : this.med;
    } else {
      
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
    const decision = confirm("You are about to detete" + item.name + "!");
    if (decision) {
      const res = this.Pservice.Delete(item);
      res ? this.pharma = this.Pservice.getPharma() : this.pharma;
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
      const res = this.Uservice.Delete(item.name);
      res ? this.users = this.Uservice.getUsers() : this.users;
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
