import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { PaginationPage } from '../pages/pagination/pagination';
import { RedeemPage } from '../pages/redeem/redeem';
import { SettingPage } from '../pages/setting/setting';
import { AuthService } from '../services/auth.service';
import { RegisterPage } from '../pages/register/register';
  
@Component({
  templateUrl: 'app.html'
})          
export class MyApp {

  rootPage:any = PaginationPage;  
  homePage = HomePage;
  redeemPage = RedeemPage;
  settingPage = SettingPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuCtrl: MenuController,
              private authService: AuthService) 
  {
    platform.ready().then(() => 
    {
      Splashscreen.hide();
    });
  }

  onLoad(page:any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout()
  {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}


