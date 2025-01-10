import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationService } from '../services/medication.service';
import { PharmaService } from '../services/pharma.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  pharma: any;
  med: any;
  fav: any;
  user: any;
  display: string;
  constructor(public route: Router, public Uservice: UserService, public Mservice: MedicationService, public Pservice: PharmaService) {
    this.user = this.Uservice.getUser();
    this.display = this.Uservice.getUser() ? this.Uservice.getUser().type : 'user';
    this.pharma = this.Pservice.getAll() ? this.Pservice.getAll().length : 0;
    // this.med = this.Mservice.getAll() ? this.Mservice.getAll().length : 0;
    if (this.user) {
    this.fav = this.Mservice.getFavorite(this.user.name)? this.Mservice.getFavorite(this.user.name).length : 0;
    console.log("fav", this.Mservice.getAll());
    } else {
      
    }
    
  }
  open(item: string, cat: string) {
     this.route.navigate([item], { state: { data: cat } });
  }
}
