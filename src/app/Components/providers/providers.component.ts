import { Component, Input } from '@angular/core';
import { ProviderService } from '../../services/providers.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {
  search: any;
  searchQuery: string = ''; // Valeur saisie dans le champ de recherche
  Providers: any;  // Liste des médicaments retournée par la recherche
  isLoading: boolean = false; // Pour gérer l'état de chargement
  @Input() image!: string;
  @Input() name!: string;
  @Input() category!: string; // Band musical, Salle, Décorateur
  @Input() location!: string;
  @Input() description!: string;
  @Input() rating!: number;
  @Input() reviews!: number;
  @Input() price!: string;
  
  constructor(private prov: ProviderService, public nav: Location, public route: Router) {
    this.Providers = this.prov.getAll().subscribe(el => {
      console.log("data", el);

          if (el) {
            this.Providers = el;
            this.isLoading = true;
          } else {
            this.Providers = [];
          }
    });
  }

  // Fonction de recherche de médicament
  searchProviders() {
    if (this.searchQuery.trim() !== '') {
      this.isLoading = true;
      this.prov.searchprovider(this.searchQuery).subscribe(
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
    this.nav.back(); // Utilisation du service nav pour revenir en arrière dans l'historique
  }
  details(item: any) {
    item.cat = "med";
    this.route.navigate(['details'], {
      state: { data: item }
    });
  }

  addFavorite(item: any) {
    this.prov.addFavorite(item);
  }

}

export { ProviderService };

