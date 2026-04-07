import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProvidersComponent } from './Components/providers/providers.component';
import { DetailsComponent } from './Components/details/details.component';
import { UserComponent } from './Components/user/user.component';
import { AddComponent } from './Components/add/add.component';
import { AdminComponent } from './admin/admin.component';
import { FavoriteComponent } from './Components/favorite/favorite.component';
import { EditComponent } from './Components/edit/edit.component';
import { ClientsComponent } from './Components/clients/clients.component';
import { PlacesComponent } from './Components/places/places.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
   {
    path: 'providers',
    component: ProvidersComponent
  },
   {
    path: 'clients',
    component: ClientsComponent
  },
   {
    path: 'places',
    component: PlacesComponent
  },
   {
    // path: 'details/:id',
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
