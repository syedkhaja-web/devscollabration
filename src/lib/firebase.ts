import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "devs-tec-collab",
  "appId": "1:443824033040:web:bc9f3f258f67292d73e995",
  "storageBucket": "devs-tec-collab.firebasestorage.app",
  "apiKey": "AIzaSyD5sRzJm_DTpBQCqMBLtYbtMv9Ge6jdUZE",
  "authDomain": "devs-tec-collab.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "443824033040"
};

// Initialize Firebase
export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

getAuth(app);
