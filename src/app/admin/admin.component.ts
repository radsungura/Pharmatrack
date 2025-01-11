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
constructor(public route: Router, public Umed: MedicationService,public Uservice: UserService, public Pservice: PharmaService, public location: Location) {
  this.med = this.Umed.getAll();
  this.users = this.Uservice.getUsers();
  this.pharma = this.Pservice.getAll();
  console.log(this.pharma);
  
  this.display = 'medications';
  }
  open(item: string) {
    this.display = item;
  }
  add(item: string) {
  this.route.navigate(['add'], {state: { data: item }});
  }
  navigate(item: string, cat: string) {
  this.route.navigate([item], {state: { data: cat }});
  }
  goBack() {
    this.location.back(); // Utilisation du service Location pour revenir en arrière dans l'historique
  }
  details(item: any) {
  item.cat = "med";
  this.route.navigate(['details'], {
    state: { data: item }
  });
  }
  edit(item: any) {
    item.cat = "med";
    this.route.navigate(['edit'], {
      state: { data: item }
    });
  }
   delete(item: any) {
     const decision = confirm("You are about to detete" + item.name + "!");
     if (decision) {
     this.Umed.delete(item.Id);
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
    this.Umed.delete(item.Id);
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
    const decision = confirm("You are about to detete  " + item.name + "  !");
    if (decision) {
      this.Uservice.Delete(item.Id);
    }
    else {
      
    }
  }
  ngOnInit() {
    this.display = history.state.data? history.state.data: 'medications';
    console.log(this.display);
  }
}
