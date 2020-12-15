import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChO48Osc1tI3KoFTGmrz0nIIpM9sd89oQ",
  authDomain: "ecommerce-redux.firebaseapp.com",
  databaseURL: "https://ecommerce-redux.firebaseio.com",
  projectId: "ecommerce-redux",
  storageBucket: "ecommerce-redux.appspot.com",
  messagingSenderId: "539819473537",
  appId: "1:539819473537:web:a5bef930dc908bd29b6b80",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
