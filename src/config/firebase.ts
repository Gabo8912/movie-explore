import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDXx19tEOsTz31dlvBfa3IQo47LITL6KMs",
    authDomain: "movie-explorer-75c15.firebaseapp.com",
    projectId: "movie-explorer-75c15",
    storageBucket: "movie-explorer-75c15.firebasestorage.app",
    messagingSenderId: "38854665933",
    appId: "1:38854665933:web:c031af7357039ab3ec2b84"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


