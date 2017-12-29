import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) 
  { }

  signUp(fname: string, lname: string, email:string, password: string, gender: string) 
  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((authData) => {
      //Gets reference to Firebase's database and sets user data in database.
      let ref = firebase.database().ref('user').push();
      let uid = ref.key;
      let usrData = firebase.database().ref().push().child('user').set({
        uid: uid,
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        gender: gender
      });

    }).catch(function(error){

    });
    
  }

  signIn(email:string, password: string) 
  {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  googleLogin() 
  {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }    

  facebookLogin() 
  {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) 
  {
    return this.afAuth.auth.signInWithPopup(provider)
  }

  logout() 
  {
    firebase.auth().signOut();
  }
}


