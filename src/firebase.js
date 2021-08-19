
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkKQ0QSR4SujlXXyH6YimFgE0QfyRPTIk",
    authDomain: "test-1-59b6a.firebaseapp.com",
    projectId: "test-1-59b6a",
    storageBucket: "test-1-59b6a.appspot.com",
    messagingSenderId: "63039803456",
    appId: "1:63039803456:web:8abc85b21cd0d7d8cbcfa5"
  };


  firebase.initializeApp(firebaseConfig);

  export default firebase;