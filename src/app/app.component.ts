import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pharmatrack';
  loged = false;
  user: any;
  display: string =  'dashboard';
  constructor(public Uservice: UserService, public route: Router) {
    this.user = this.Uservice.getUser();
    this.loged = this.Uservice.getLoged();
   
  }
  logout() {
    this.user.logout
  }
  open(item: string) {
    // this.display = item;
    this.route.navigate(['user']);
  }
  
}
