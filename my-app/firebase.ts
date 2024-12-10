import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCBuw8PS4abnNRu15f7Xzr4bOLqeBIkLjY",
 authDomain: "notion-clone-b27fa.firebaseapp.com",
 projectId: "notion-clone-b27fa",
 storageBucket: "notion-clone-b27fa.firebasestorage.app",
 messagingSenderId: "406741580295",
 appId: "1:406741580295:web:bf7c7c52fdb2141d5148a2"
};

const app =  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export{db}