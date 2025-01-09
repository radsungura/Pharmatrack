import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // Liste de médicaments fictive pour simuler la recherche
  medications = [
    { Id: 'Asp',price: 5000, name: 'Aspirin', desc: 'Used to reduce pain, fever, or inflammation.', qty: 8, pharma: 'Plus' },
    { Id: 'Ibu',price: 2000, name: 'Ibuprofen', desc: 'Nonsteroidal anti-inflammatory drug (NSAID).', qty: 10, pharma: 'Central' },
    { Id: 'Par',price: 3000, name: 'Paracetamol', desc: 'Used to treat mild to moderate pain and reduce fever.', qty: 15, pharma: 'Sun' },
    { Id: 'Amo',price: 1000, name: 'Amoxicillin', desc: 'Antibiotic used to treat bacterial infections.', qty: 17, pharma: 'Gare' }
  ];
  allMed: any;
  med: any;
  constructor(private db: AngularFirestore) {
    
  }
  getAll() {
    // firebase
    //  return this.db.collection('medications').snapshotChanges().pipe((actions: any) => {
    //     return actions.map((a: any) => {
    //       const data = a.payload.doc.data(); // User data
    //       const id = a.payload.doc.id; // User document ID
    //       return { id, ...data }; // Return an object with both the ID and data
    //     });
    //   })
      // localstorage
    return this.medications;
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
    let fav: any;
    if (data) {
      fav = JSON.parse(data).filter((el: any) => el.user === item );
      return fav;
    } else {
      fav = {};
    }
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
      }
      else {
        favoris.push(item);
      }
      try {
        localStorage.setItem('medfav', JSON.stringify(favoris));
      }
      catch (error) {
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
  delete(item: any) {
    this.db.collection('medications').doc(item.Id).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }
}