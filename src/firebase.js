import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZlaCmO4cQuJ02qMaucv8t6Adi5oAtO5o",
  authDomain: "my-project-final-349202.firebaseapp.com",
  projectId: "my-project-final-349202",
  storageBucket: "my-project-final-349202.appspot.com",
  messagingSenderId: "696948991776",
  appId: "1:696948991776:web:3846ece3c7930bd3e1d945",
  measurementId: "G-GZH0QE1RC9"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const fs = firebase

export { auth, storage, db, fs };
