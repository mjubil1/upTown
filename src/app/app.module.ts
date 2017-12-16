import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HomePage } from '../app/home/home';
import { LoginPage } from '../app/login/login';
import { Facebook } from '@ionic-native/facebook';


  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCpxfsS8L98D6MgQ74kQZlBP6tCICIO18o",
    authDomain: "uptown-9ed55.firebaseapp.com",
    databaseURL: "https://uptown-9ed55.firebaseio.com",
    projectId: "uptown-9ed55",
    storageBucket: "uptown-9ed55.appspot.com",
    messagingSenderId: "1033320275639"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
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
