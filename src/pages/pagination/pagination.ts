import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-pagination',
  templateUrl: 'pagination.html',
})
export class PaginationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  newUser()
  {
    this.navCtrl.push(RegisterPage);
  }

  userLogin()
  {
    this.navCtrl.push(LoginPage);
  }
}
