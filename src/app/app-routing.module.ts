import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediSearchComponent } from './Components/medi-search/medi-search.component';
import { PharmaSearchComponent } from './Components/pharma-search/pharma-search.component';
import { DetailsComponent } from './Components/details/details.component';
import { UserComponent } from './Components/user/user.component';
import { AddComponent } from './Components/add/add.component';
import { AdminComponent } from './admin/admin.component';
import { FavoriteComponent } from './Components/favorite/favorite.component';
import { EditComponent } from './Components/edit/edit.component';

const routes: Routes = [
    {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'user',
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
    path: 'medication',
    component: MediSearchComponent
  },
   {
    path: 'pharmacy',
    component: PharmaSearchComponent
  },
   {
    path: 'details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
