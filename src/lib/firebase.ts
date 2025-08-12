import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator, inMemoryPersistence, setPersistence } from 'firebase/auth';

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

const auth = getAuth(app);

if (typeof window !== 'undefined') {
    // We only want to run this configuration logic in the browser.
    // And because it's async, we'll wrap it in an immediately-invoked function expression.
    (async () => {
        try {
            // Connect to the local Auth emulator.
            connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
            // This persistence is useful for the development environment.
            await setPersistence(auth, inMemoryPersistence);
        } catch (e) {
            console.error("Could not connect to auth emulator", e);
        }
    })();
}
