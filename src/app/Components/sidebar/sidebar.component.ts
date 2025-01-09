import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebar: any;
  isSidebarVisible: boolean = true;
  constructor(public route: Router) {
    this.sidebar = document.getElementById('sidebar')!;
  }
// Fonction pour toggler le menu latéral
  toggle(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  open(item: string) {
    alert(item)
    this.route.navigate([item], {
      state: { data : "med" }
    });
  }
  
}
