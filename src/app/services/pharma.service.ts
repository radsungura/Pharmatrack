import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmaService {
pharmacies = [
      { Id: 'Plus', name: 'Plus Pharma', address: '123 Rue de Paris, Paris' },
      { Id: 'Sun', name: 'Sun Pharma', address: '456 Boulevard Saint-Germain, Paris' },
      { Id: 'Gare', name: 'Gare Pharma', address: '789 Avenue de la Gare, Lyon' },
      { Id: 'Central', name: 'Central Pharma', address: '101 Rue de la Liberté, Marseille' }
    ];
  constructor() { }

  // Simuler une recherche de pharmacies
  searchPharmacies(query: string): Observable<any[]> {
    // Filtrer les pharmacies en fonction du nom
    const results = this.pharmacies.filter(pharma => pharma.name.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }
  getAll(){
    // Filtrer les pharmacies en fonction du nom
    const results = this.pharmacies;
    return results; // Retourner un Observable
  }
   getSingle(item: string) {
     const data = this.pharmacies.find(el => el.Id === item);
      console.log(data, item);
     if (data) {
      return data;
    } else {
      return {};
    }
  }
}
