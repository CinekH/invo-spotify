// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCHINzRn6kjTFGDxa54B46VT7e0I5fxNJU",

  authDomain: "invo-spotify.firebaseapp.com",

  databaseURL: "https://invo-spotify-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "invo-spotify",

  storageBucket: "invo-spotify.appspot.com",

  messagingSenderId: "1076076516611",

  appId: "1:1076076516611:web:88e959bf3432c33d340536",

  measurementId: "G-8XDX2YWKLC"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);