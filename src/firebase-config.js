
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC257FYuXELaHMIOc254d1oQAkgRUwmqQw",
    authDomain: "journal-app-42603.firebaseapp.com",
    projectId: "journal-app-42603",
    storageBucket: "journal-app-42603.appspot.com",
    messagingSenderId: "92618620171",
    appId: "1:92618620171:web:8c2d5e188dbea61329360e",
    measurementId: "G-2G0GC99J40"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);