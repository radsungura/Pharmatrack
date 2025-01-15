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
  loged: any;
  display: string;
  constructor(public route: Router, public Uservice: UserService, public Mservice: MedicationService, public Pservice: PharmaService) {
    this.loged = this.Uservice.getUser();
    this.display = this.Uservice.getUser() ? this.Uservice.getUser().type : 'user';
    this.pharma = this.Pservice.getPharma() ? this.Pservice.getPharma().length : 0;
    this.user = this.Uservice.getUsers() ? this.Uservice.getUsers().length : 0;
    this.med = this.Mservice.getMed() ? this.Mservice.getMed().length : 0;
    if (this.loged) {
      this.fav = this.Mservice.getFavorite(this.loged.name)? this.Mservice.getFavorite(this.loged.name).length : 0;
    } else {
    }
  }
  open(item: string, cat: string) {
     this.route.navigate([item], { state: { data: cat } });
  }
}
