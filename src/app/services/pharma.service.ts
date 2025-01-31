import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PharmaService {
  pharmacies: any;
  getUsers: any;

  constructor(private db: AngularFirestore) {
    this.getPharma().subscribe((arg: any) => {
      this.pharmacies = arg;
    });
  }
  // pharmacy search
  searchPharmacies(query: string): Observable<any[]> {
    // retriview pharmacies by names or address
    const results = this.pharmacies.filter((pharma: any) => pharma.name.toLowerCase().includes(query.toLowerCase()) || pharma.address.toLowerCase().includes(query.toLowerCase()));
    return of(results); // Retourn Observable result
  }
  getSingle(item: string) {

    const data = this.pharmacies.find((el: any) => el.code === item);
    console.log(data, item);
    if (data) {
      return data;
    } else {
      return {};
    }
  }
  Delete(item: any) {
    return this.db.collection('pharmacies').doc(item.code).delete()
      .then(() => {
      console.log('Form data saved successfully!');
      return true;
      })
      .catch((error) => {
        console.error('Error saving form data: ', error);
        return false;
      });
  }
  Update(item: any) {
    return this.db.collection('pharmacies').doc(item.code).update(item)
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
    return this.db.collection('pharmacies').doc(item.code).set(item)
    .then(() => {
      console.log('Form data saved successfully!');
      return true;
    })
    .catch((error) => {
      console.error('Error saving form data: ', error);
      return false;
    });
  }
  getPharma() {
    return this.db.collection('pharmacies').valueChanges()
  }
}
