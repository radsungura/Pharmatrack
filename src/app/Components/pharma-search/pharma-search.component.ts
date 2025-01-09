import { Component } from '@angular/core';
import { PharmaService } from '../../services/pharma.service';
import { Location } from '@angular/common'; // Pour gérer le bouton Retour
import { Router } from '@angular/router';

@Component({
  selector: 'app-pharma-search',
  templateUrl: './pharma-search.component.html',
  styleUrls: ['./pharma-search.component.scss']
})
export class PharmaSearchComponent {
  search: any;
  searchQuery: string = ''; // Valeur saisie dans le champ de recherche
  pharmacies: any[] = [];  // Liste des pharmacies retournée par la recherche
  isLoading: boolean = false; // Pour gérer l'état de chargement

  constructor(private pharmaService: PharmaService, private location: Location, public route: Router) {
    this.pharmacies = this.pharmaService.getAll();
    if (this.pharmacies) {
        this.isLoading = true;
    } else {
      this.pharmacies = [];
    }
  }

  // Fonction pour effectuer la recherche de pharmacies
  searchPharmacies() {
    if (this.searchQuery.trim() !== '') {
      this.isLoading = true;
      this.pharmaService.searchPharmacies(this.searchQuery).subscribe(
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

  // Fonction pour revenir à la page précédente
  goBack() {
    this.location.back(); // Utilisation du service Location pour revenir en arrière dans l'historique
  }
  details(item: any) {
    item.cat = "pharma";
    this.route.navigate(['details'], {
      state: { data: item }
    });
  }
}
