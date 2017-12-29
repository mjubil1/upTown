import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { RedeemPage } from '../pages/redeem/redeem';
import { PaginationPage } from '../pages/pagination/pagination';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';

// Initialize Firebase
  const fb = {
    apiKey: "AIzaSyCpxfsS8L98D6MgQ74kQZlBP6tCICIO18o",
    authDomain: "uptown-9ed55.firebaseapp.com",
    databaseURL: "https://uptown-9ed55.firebaseio.com",
    projectId: "uptown-9ed55",
    storageBucket: "uptown-9ed55.appspot.com",
    messagingSenderId: "1033320275639"
  };

  firebase.initializeApp(fb);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PaginationPage,
    RedeemPage,
    RegisterPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fb),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PaginationPage,
    RedeemPage,
    RegisterPage,
    SettingPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestoreModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook  
  ]
})
export class AppModule {
  
}
