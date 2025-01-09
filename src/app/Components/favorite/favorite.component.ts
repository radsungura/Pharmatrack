import { Component } from '@angular/core';
import { MedicationService } from 'src/app/services/medication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  search: any;
  searchQuery: string = ''; // Valeur saisie dans le champ de recherche
  medications: any;  // Liste des médicaments retournée par la recherche
  isLoading: boolean = false; // Pour gérer l'état de chargement
  user: any;

  constructor(private medService: MedicationService, private Uservice: UserService, public location:Location, public route: Router) {
    this.user = this.Uservice.getUser();
    this.medications = this.medService.getFavorite(this.user.name);
    console.log("fav component ", this.medications, this.user.name);
    if (this.medications) {
      this.isLoading = true;
    } else {
      this.medications = [];
    }
  }

  // Fonction de recherche de médicament
  searchMedications() {
    if (this.searchQuery.trim() !== '') {
      this.isLoading = true;
      this.medService.searchMedication(this.searchQuery).subscribe(
        (results: any) => {
          this.search = results;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Erreur lors de la recherche', error);
          this.isLoading = false;
        }
      );
    } else {
      this.search = [];
    }
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
  delete(item: any) {
    let res = this.medService.deleteFavorite(item);
    console.log(res);
    this.medications = res;
    
  }
}
