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
  Rerror: boolean;
  constructor(public Uservice: UserService) {
    this.user = {};
    this.Rerror = false;
    this.loged = false;
  }
  login(item: any) {
    let res = this.Uservice.login(item);
    this.loged = res;
  }
  register(item: any) {
    this.Rerror = item.pass !== item.conf ? true : false; 
    if (this.Rerror) {
    }
    else {
      if (Object.keys(item).length < 6) {
            alert("Some fields are not completed correctly !")
      } else {
        item.type = "user";
        const res = this.Uservice.Create(item);
        if (res) {
          this.user = {}
          this.display = 'login';
        }
        else {
            alert("Some fields are not completed correctly !")
        }
      }
    }
  }
}
