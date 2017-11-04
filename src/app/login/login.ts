import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
//import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { HomePage } from '../home/home';

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

  uid: string;
  email: string;
  displayName?: string;
  user: Observable<User>;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
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



              
  /*Login with basic email and password authentication */
  emailPasswordLogin() {
        this.navCtrl.push(HomePage);      
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


