import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "devs-tec-collab",
  "appId": "1:443824033040:web:bc9f3f258f67292d73e995",
  "storageBucket": "devs-tec-collab.appspot.com",
  "apiKey": "AIzaSyD5sRzJm_DTpBQCqMBLtYbtMv9Ge6jdUZE",
  "authDomain": "devs-tec-collab.firebaseapp.com",
  "messagingSenderId": "443824033040",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
