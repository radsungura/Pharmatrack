import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges{
  sidebar: any;
  isSidebarVisible: boolean = true;
  @Input() user: any;
  constructor(public route: Router, public Uservice: UserService) {
    this.sidebar = document.getElementById('sidebar')!;
    this.user = this.Uservice.getUser()? this.Uservice.getUser(): {};
  }
// Fonction pour toggler le menu latéral
  toggle(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  open(item: string) {
    if (item == 'favorite' && !this.user.name) {
      this.route.navigate(['user']);
    } else if (item == 'admin') { 
      this.route.navigate([item], {
      state: { data : 'medications' }
    });
    }
    else {
      this.route.navigate([item], {
      state: { data : item }
    });
    }
    
  }
  ngOnChanges(item: any) {
    this.user = item.user.currentValue;
  }
  
}
