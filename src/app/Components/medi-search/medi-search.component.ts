import { Component } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medi-search',
  templateUrl: './medi-search.component.html',
  styleUrls: ['./medi-search.component.scss']
})
export class MediSearchComponent {
  search: any;
  searchQuery: string = ''; // Valeur saisie dans le champ de recherche
  medications: any;  // Liste des médicaments retournée par la recherche
  isLoading: boolean = false; // Pour gérer l'état de chargement

  constructor(private medService: MedicationService, public location: Location, public route: Router) {
    this.medications = this.medService.getAll();
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

  addFavorite(item: any) {
    this.medService.addFavorite(item);
  }

}

