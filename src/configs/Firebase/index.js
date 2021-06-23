import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDEKK25TKumbbFpGuSd4afo_kCtPyYXcuI",
    authDomain: "simple-pos-24b66.firebaseapp.com",
    projectId: "simple-pos-24b66",
    storageBucket: "simple-pos-24b66.appspot.com",
    messagingSenderId: "777699219129",
    appId: "1:777699219129:web:2152d81c64a35689cf2d68"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
