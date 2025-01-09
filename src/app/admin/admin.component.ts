import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from '../services/medication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  med: any;
constructor(public route: Router, public Umed: MedicationService) {
  this.med = this.Umed.getAll();
  }
   open(item: string) {
    this.route.navigate([item]);
  }
}
