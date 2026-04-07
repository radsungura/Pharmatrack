import { Component, OnChanges, OnInit } from '@angular/core';
import { PharmaService } from 'src/app/services/pharma.service';
import { Location } from '@angular/common';
import { ProviderService } from 'src/app/services/providers.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  data: any;
  service: any;
  //  service = {
  //   name: 'Royal Band Bujumbura',
  //   category: 'Band Musical',
  //   location: 'Bujumbura',
  //   rating: 4.7,
  //   reviews: 120,
  //   price: 250,
  //   description: 'Groupe musical professionnel pour mariages, anniversaires et soirées privées.',
  //   images: [
  //     'assets/band1.jpeg',
  //     'assets/band2.jpeg',
  //     'assets/band3.jpeg'
  //   ],
  //   services: [
  //     'Animation mariage',
  //     'Soirée privée',
  //     'Anniversaire',
  //     'Concert live'
  //   ]
  // }
  constructor(private router: ActivatedRoute, public route: Router, public phaservice: PharmaService,public Uservice: UserService,public medservice: ProviderService, public location: Location) {
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
  //   this.router.paramMap.subscribe(params => {
  //   this.data = params.params!;
  //   console.log("this.data", this.data, params);
  // });

    const data = history.state.data;
    if (!data) {
      this.route.navigate(['providers']);
      return;
    }
    if (history.state.cat == 'provider') {
      this.display = 'provider';
      this.service = data;
      console.log('state', history.state.data, this.user);
    }
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
    
  }
}
