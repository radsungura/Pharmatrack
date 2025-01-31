import { Component, OnChanges, OnInit } from '@angular/core';
import { PharmaService } from 'src/app/services/pharma.service';
import { Location } from '@angular/common';
import { MedicationService } from 'src/app/services/medication.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  tel: boolean = false;
  med: any;
  pharma: any;
  user: any;
  display: string = '';
  constructor(public route: Router, public phaservice: PharmaService,public Uservice: UserService,public medservice: MedicationService, public location: Location) {
    this.user = Uservice.getUser();
  }
   goBack() {
    this.location.back(); // Utilisation du service Location pour revenir en arrière dans l'historique
   }
  addFavorite(item: any) {
    if (!this.user.name) {
      this.route.navigate(['user']);
      return
    } 
    item.user = this.user.name;
    this.medservice.addFavorite(item);
  }
  contact() {
    // alert('contact seller on: ' + this.pharma.tel)
    this.tel = this.user.tel? true: false;
  }
  async ngOnInit() {
    const data = history.state.data;
    if (data.cat == 'med') {
      this.display = 'medication';

      this.med = data;
      let pharma : any = this.phaservice.getSingle(data.pharma);
      this.med.pharma = pharma;

      console.log(this.med);
      
    }
    else if (data.cat == 'pharma') {
      this.display = 'pharmacy';
      this.pharma = data;
      let med: any = await this.medservice.byPharma(data.code).subscribe((el: any) => {
        this.pharma.med = el;
        console.log(this.pharma);
      });
      console.log(this.pharma);
    }
    else if (data.cat == 'user') {
      this.display = 'user';
      this.user = data;
    }
    else {
    }
    console.log('state', history.state.data, this.user);
  }
}
