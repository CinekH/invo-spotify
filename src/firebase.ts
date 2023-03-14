// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCHINzRn6kjTFGDxa54B46VT7e0I5fxNJU",
    authDomain: "invo-spotify.firebaseapp.com",
    projectId: "invo-spotify",
    storageBucket: "invo-spotify.appspot.com",
    messagingSenderId: "1076076516611",
    appId: "1:1076076516611:web:50dc464652c56941340536",
    measurementId: "G-VPKKJ4JN6E",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
