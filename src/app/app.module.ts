import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MediSearchComponent } from './Components/medi-search/medi-search.component';
import { MedicationService } from './services/medication.service';
import { PharmaService } from './services/pharma.service';
import { PharmaSearchComponent } from './Components/pharma-search/pharma-search.component';
import { DetailsComponent } from './Components/details/details.component';
import { UserComponent } from './Components/user/user.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AddComponent } from './Components/add/add.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AdminComponent } from './admin/admin.component';
import { FavoriteComponent } from './Components/favorite/favorite.component';
import { EditComponent } from './Components/edit/edit.component';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCciLgV6xmSZfrfBLFz9WIMbfBPq9Ubyc",
  authDomain: "e-healler.firebaseapp.com",
  projectId: "e-healler",
  storageBucket: "e-healler.firebasestorage.app",
  messagingSenderId: "926170034849",
  appId: "1:926170034849:web:ef3f7d7d2f59f4a97eb6e0",
  measurementId: "G-L52X8DLCCJ"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    MediSearchComponent,
    PharmaSearchComponent,
    DetailsComponent,
    UserComponent,
    AddComponent,
    AdminComponent,
    FavoriteComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [MedicationService, PharmaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
