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
import { NotificationsComponent } from './Components/notifications/notifications.component';
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
  apiKey: "AIzaSyDRmQOkCbF1liRNSZFM--t6MdBB2gp-EfA",
  authDomain: "e-heals.firebaseapp.com",
  projectId: "e-heals",
  storageBucket: "e-heals.firebasestorage.app",
  messagingSenderId: "109685101237",
  appId: "1:109685101237:web:00d343f3106f32c7a8a4fc",
  measurementId: "G-8Q8VPL8270"
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
    NotificationsComponent,
    AddComponent,
    AdminComponent,
    FavoriteComponent,
    EditComponent
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
