
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
  

const firebaseConfig = {
  apiKey: "AIzaSyAp-59jGJuBKA51jENqWuq9Y-snigLIzRs",
  authDomain: "todo-app-f4302.firebaseapp.com",
  projectId: "todo-app-f4302",
  storageBucket: "todo-app-f4302.appspot.com",
  messagingSenderId: "170862393334",
  appId: "1:170862393334:web:d4ec2a349be838b5bdb9d7",
  measurementId: "G-LZ40CH3ZCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export {db}
