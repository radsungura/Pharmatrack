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
  pharma: any = 0;
  med: any = 0;
  fav: any = 0;
  user: any = 0;
  loged: any;
  display: string;
  constructor(public route: Router, public Uservice: UserService, public Mservice: MedicationService, public Pservice: PharmaService) {
    this.loged = this.Uservice.getUser();
    this.display = this.loged ? this.loged.type : 'user';
    // Fetch all collection data
    this.Pservice.getPharma().subscribe((el: any) => {
      this.pharma = el ? el.length : 0;
    });
    this.Mservice.getMed().subscribe((el: any) => {
      this.med = el ? el.length : 0;
    });
    this.Uservice.getUsers().subscribe((el: any) => {
      this.user = el ? el.length : 0;
    });

    if (this.loged) {
      this.fav = this.Mservice.getFavorite(this.loged.name)? this.Mservice.getFavorite(this.loged.name).length : 0;
    } else {
    }    
  }

  open(item: string, cat: string) {
     this.route.navigate([item], { state: { data: cat } });
  }
}
