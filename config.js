import firebase from "firebase";
require("@firebase/firestore");

 var firebaseConfig = {
    apiKey: "AIzaSyD8NpNxviCAni75QhMBDvPELHbwSIqcPHg",
    authDomain: "vlogz-c0b10.firebaseapp.com",
    projectId: "vlogz-c0b10",
    storageBucket: "vlogz-c0b10.appspot.com",
    messagingSenderId: "292719313483",
    appId: "1:292719313483:web:29893dc10a7f4fef7743ce"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
