import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // Liste de médicaments fictive pour simuler la recherche
  medications = [
    { Id: 'Asp', name: 'Aspirin', desc: 'Used to reduce pain, fever, or inflammation.', qty: 8, pharma: 'Plus' },
    { Id: 'Ibu', name: 'Ibuprofen', desc: 'Nonsteroidal anti-inflammatory drug (NSAID).', qty: 10, pharma: 'Central' },
    { Id: 'Par', name: 'Paracetamol', desc: 'Used to treat mild to moderate pain and reduce fever.', qty: 15, pharma: 'Sun' },
    { Id: 'Amo', name: 'Amoxicillin', desc: 'Antibiotic used to treat bacterial infections.', qty: 17, pharma: 'Gare' }
  ];
  allMed: any;
  med: any;
  constructor(private db: AngularFirestore) {
    try {
      this.db.collection('medications').valueChanges().subscribe((el: any) => {
        if (el.lenght > 0) {
          console.log("empty", el.lenght);
          
          this.medications = el;
        }
      })
    } catch (error) {
      console.error("error", error);
    }
  }
  getAll() {
    const res = this.medications;
    return res; // Retourner un Observable
  }
  // Simuler une recherche dans une API
  searchMedication(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.medications.filter(med => med.name.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }
  byPharma(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.medications.filter(med => med.pharma.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }
  getSingle(item: string) {
    const data = this.medications.find(el => el.Id === item);
    if (data) {
      return data;
    } else {
      return {};
    }
  }
  getFavorite(item: string) {
    const data: any = localStorage.getItem('medfav');
    console.log("get", item, JSON.parse(data));
    
    let fav: any;
    if (data) {
      fav = JSON.parse(data).filter((el: any) => el.user === item );
    console.log("get", item, fav);

      return fav;
    } else {
      fav = {};
    }
    console.log("getfav", fav);
    
    return fav;
  }
  addFavorite(item: any) {
    let favoris: any = [];
    const res = this.getFavorite(item.user)
      const data: any = res;
      // return
      if (data) {
        favoris = data;
        favoris.push(item);
      } else {
        favoris.push(item);
      }
      try {
        localStorage.setItem('medfav', JSON.stringify(favoris));
      } catch (error) {
        console.log("MedError", error);
      }
  }
  deleteFavorite(item: any) {
    let favoris: any = [];
    let res = this.getFavorite(item.user);
    if (res) {
      const seted = res.filter((el: any) => el.Id !== item.Id);
        localStorage.setItem('medfav', JSON.stringify(seted));
      alert("Saved successfully !");
      favoris = seted;
    } 
    return favoris;
  }
}