import app from 'firebase/app';
import 'firebase/auth';
import  'firebase/firestore'

const config = {
    apiKey: "AIzaSyDyhklSk_QaLs3n0k6hUhfP5kqFa0RV4sU",
    authDomain: "genie-histoire.firebaseapp.com",
    databaseURL: "https://genie-histoire.firebaseio.com",
    projectId: "genie-histoire",
    storageBucket: "genie-histoire.appspot.com",
    messagingSenderId: "417264618994",
    appId: "1:417264618994:web:228731ca18c6524d01ef6b"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //Inscription

    signupUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    //Connexion
    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    //Déconexion
    signoutUser = () =>
        this.auth.signOut();


    // récuperer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid =>this.db.doc(`users/${uid}`);
}

export default Firebase;