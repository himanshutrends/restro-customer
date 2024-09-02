import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAspmZiwJzWBaURl-hZvk_Vnl4Mbb7-zoM",
    authDomain: "yumyum-5c5ad.firebaseapp.com",
    projectId: "yumyum-5c5ad",
    storageBucket: "yumyum-5c5ad.appspot.com",
    messagingSenderId: "839971540285",
    appId: "1:839971540285:web:095075e2c6785e1e3d0954",
    measurementId: "G-LEQ11VRXYK"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
