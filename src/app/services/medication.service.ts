import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // Liste de médicaments fictive pour simuler la recherche
  medications = [
    { code: 'Asp',price: 50, name: 'Aspirin', desc: 'Used to reduce pain, fever, or inflammation.', qty: 8, pharma: 'Plus' },
    { code: 'Ibu',price: 2, name: 'Ibuprofen', desc: 'Nonsteroidal anti-inflammatory drug (NSAID).', qty: 10, pharma: 'Central' },
    { code: 'Par',price: 30, name: 'Paracetamol', desc: 'Used to treat mild to moderate pain and reduce fever.', qty: 15, pharma: 'Sun' },
    { code: 'Amo',price: 10, name: 'Amoxicillin', desc: 'Antibiotic used to treat bacterial infections.', qty: 17, pharma: 'Gare' }
  ];
  allMed: any;
  med: any;
  constructor(private db: AngularFirestore) {
    
    
  }
  getAll() {
      // firebase
    return this.db.collection('medications').snapshotChanges().pipe((actions: any) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data(); // User data
          const id = a.payload.doc.id; // User document ID
          return { id, ...data }; // Return an object with both the ID and data
        });
      })
  }
  // Simuler une recherche dans une API
  searchMedication(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.medications.filter((med: any) => med.name.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }
  byPharma(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.medications.filter((med: any) => med.pharma.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
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
  Delete(item: any) {    
    //delete in firebase 
    return this.db.collection('medications').doc(item.code).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    
  }
  Update(item: any) {
    return this.db.collection('medications').doc(item.code).update(item)
    .then(() => {
      console.log('Form data saved successfully!');
      return true;
    })
    .catch((error) => {
      console.error('Error saving form data: ', error);
      return false;
    });
  }
  Create(item: any) {
      // Save data to Firestore
    return this.db.collection('medications').doc(item.code).set(item)
    .then(() => {
      console.log('Form data saved successfully!');
      return true;
    })
    .catch((error) => {
      console.error('Error saving form data: ', error);
      return false;
    });
  }
  getMed() {
    return  this.db.collection('medications').valueChanges()
  }
}