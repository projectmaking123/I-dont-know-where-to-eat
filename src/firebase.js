import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDyqC_BTx7GBvISQW12SVYGIzqTO__roTg",
  authDomain: "i-dont-know-where-to-eat.firebaseapp.com",
  databaseURL: "https://i-dont-know-where-to-eat.firebaseio.com",
  projectId: "i-dont-know-where-to-eat",
  storageBucket: "i-dont-know-where-to-eat.appspot.com",
  messagingSenderId: "756659951034"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
