import { Component } from '@angular/core';
import { AlertController,NavController, NavParams, LoadingController } from 'ionic-angular';
//import { Router } from "@angular/router";

import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from "../../services/auth.service";
//import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //Variables
  user: Observable<User>;
  
  constructor(private loadingCtrl: LoadingController,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private alertCtrl: AlertController,
              private authService: AuthService,
              public navParams: NavParams,
              public navCtrl: NavController,
              /*private fb: Facebook*/) 
  {

    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
    .switchMap(user => {
      if(user) {
        return this.afs.doc<User>('users/${user.uid}').valueChanges()
      } else {
        return Observable.of(null)
      }
    })
  }
     
  
  onSignIn(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content:'Signing you in...'
    });
    loading.present();
    this.authService.signIn(form.value.email,form.value.pwd)
    .then(data => {
      loading.dismiss();
      this.navCtrl.push(HomePage).catch(err => {
        let alert = this.alertCtrl.create ({
          title: 'No Entry!',
          message: 'You should not pass',
          buttons: ['Ok']
        })
      })
    })
    .catch(error => {
        loading.dismiss(); 

        //Handle errors
        var errorCode = error.code;
        
        if(errorCode == 'auth/account-exists-with-different-credential') {
          const alert = this.alertCtrl.create({
            title: 'Signin failed!',
            message: 'Email already associated with another account.',
            buttons:['Ok']
        });
      alert.present();        
    }

        else if(errorCode == 'auth/user-disabled') {
          const alert = this.alertCtrl.create({
            title: 'Signin failed!',
            message: 'User account is disabled.',
            buttons:['Ok']
        });
      alert.present();        
    }

      else if(errorCode == 'auth/user-not-found') {
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: 'User was not found.',
          buttons:['Ok']
      });
    alert.present();        
  }

    if(errorCode == 'auth/wrong-password') {
      const alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: 'Invalid password.',
        buttons:['Ok']
      });
    alert.present();        
  }
  });
}
  /*Login for facebook authentication */
  /*facebookLogin() {
  this.fb.login(['email']).then((loginResponse) => {
  let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
  firebase.auth().signInWithCredential(credential).then((info) => {
    alert(JSON.stringify(info));
      })
    })
  }*/
              
  /*Login for google authentication*/ 
  googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()
  this.navCtrl.push(HomePage);
  return this.oAuthLogin(provider);
  }
              
              
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
    this.updateUserData(credential.user)
    })
  }
              
  private updateUserData(user) {
  // Sets user data to firestore on login
              
  const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
              
  const data: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  }
              
  return userRef.set(data);
    }
  }            


