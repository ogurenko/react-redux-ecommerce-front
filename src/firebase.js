import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your API key",
  authDomain: "your app domain",
  databaseURL: "your database URL",
  projectId: "ecommerce-redux",
  storageBucket: "ecommerce-redux.appspot.com",
  messagingSenderId: "your messaging Id",
  appId: "your appId",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
