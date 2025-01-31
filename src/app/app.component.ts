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
  display: string =  'home';
  constructor(public Uservice: UserService, public route: Router) {
    this.user = this.Uservice.getUser();
    this.loged = this.Uservice.getLoged();
    this.display = this.loged ? 'dashboard' : 'home';

   
  }
  logout() {
    this.user.logout
    window.location.reload()
  }
  open(item: string) {
    this.display = 'dashboard';
    this.route.navigate(['user']);
  }
  navigate(item: string) {
    
  }
  
}
