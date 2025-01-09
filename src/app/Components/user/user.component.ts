import { Component } from '@angular/core';
import { User } from 'src/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: any;
  display: string = 'login';
  loged: any;
  constructor(public Uservice: UserService) {
    this.user = {};
    this.loged = false;
  }
  login(item: any) {
    let res = this.Uservice.login(item);
    this.loged = res;
  }
  register(item: User) {
    console.log(item);
  }
}
