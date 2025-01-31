  addMedication(medication: any): Promise<any> {
    return this.firestore.collection('medications').doc(id).set(medication);
  }

  // Read - Get all medications
  getMedications(): Observable<any[]> {
      return this.medicationsCollection.valueChanges();
    //   with id
      return this.medicationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Update - Update a medication
  updateMedication(id: string, medication: any): Promise<void> {
    return this.medicationsCollection.doc(id).update(medication);
  }

  // Delete - Remove a medication
  deleteMedication(id: string): Promise<void> {
    return this.medicationsCollection.doc(id).delete();
  }

  // Read single medication
  getMedicationById(id: string): Observable<any> {
    return this.medicationsCollection.doc(id).valueChanges();
  }
}