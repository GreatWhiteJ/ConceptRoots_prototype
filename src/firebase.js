import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDeWibg2n9ENfgBDUt5fFTyWmpQ7vAEL24",
  authDomain: "conceptroots-prototype.firebaseapp.com",
  databaseURL: "https://conceptroots-prototype.firebaseio.com",
  projectId: "conceptroots-prototype",
  storageBucket: "conceptroots-prototype.appspot.com",
  messagingSenderId: "193108700853",
  appId: "1:193108700853:web:9b5cb26f632786f92498fc",
  measurementId: "G-5TW417E9EE"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
