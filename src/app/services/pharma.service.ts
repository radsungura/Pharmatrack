import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseAppModule } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PharmaService {
  pharmacies = [
    { tel: '71 345 077', code: 'Plus', name: 'Plus Pharma', address: '123 Rue de Paris, Paris' },
    { tel: '61 607 690', code: 'Sun', name: 'Sun Pharma', address: '456 Boulevard Saint-Germain, Paris' },
    { tel: '71 255 077', code: 'Gare', name: 'Gare Pharma', address: '789 Avenue de la Gare, Lyon' },
    { tel: '71 358 077', code: 'Central', name: 'Central Pharma', address: '101 Rue de la Liberté, Marseille' }
  ];
  getUsers: any;
  constructor(private db: AngularFirestore) { }
  // pharmacy search
  searchPharmacies(query: string): Observable<any[]> {
    // Filtrer les pharmacies en fonction du nom
    const results = this.pharmacies.filter(pharma => pharma.name.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourner un Observable
  }
  getAll(){
    const res = localStorage.getItem('medPharma');
    const data = res? JSON.parse(res): false;
    return data;
  }
  getSingle(item: string) {
    const data = this.pharmacies.find(el => el.code === item);
    console.log(data, item);
    if (data) {
    return data;
  } else {
    return {};
  }
  }
  Delete(item: any) {
      // delete in localstorage
    const res = this.getPharma();
    if (res) {
      const data = res.filter((el: any) => el.code !== item.code);
      localStorage.setItem("medPharma", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
    
    //delete in firebase 
    this.db.collection('pharmacies').doc(item.code).delete().then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    
  }
  Update(item: any) {
    const res = this.getPharma();
    if (res) {
      const data = res.findIndex((el: any) => el.code === item.code);
      res[data] = item;
      localStorage.setItem("medPharma", JSON.stringify(res));
      return true;
    }
    else {
      return false;
    }
  }
  Create(item: any) {
      // localstorage
    let res: any = [];
    const data = this.getPharma();
    if (data) {
      res = data;
      res.push(item);
    }
    else {
      res.push(item);
    }
    try {
      localStorage.setItem('medPharma', JSON.stringify(res));
      return true;
    }
    catch (error) {
      console.log("PharmaError", error);
      return false;
    }
      // Save data to Firestore
    return this.db.collection('pharmacies').add(item).then((el: any) => {
      alert('Data saved successfully !');
      return el;
    })
    .catch((error) => {
      console.error('Error saving form data: ', error);
      return false;
    });
  }
  getPharma() {
    const res = localStorage.getItem('medPharma');
    const data = res? JSON.parse(res): false;
    return data;
  }
}
