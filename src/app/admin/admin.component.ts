import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from '../services/medication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  med: any;
  display: string;
constructor(public route: Router, public Umed: MedicationService, public location: Location) {
  this.med = this.Umed.getAll();
  this.display = 'medications';
  }
  open(item: string) {
    this.display = item;
  }
  navigate(item: string) {
  this.route.navigate([item]);
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
}
