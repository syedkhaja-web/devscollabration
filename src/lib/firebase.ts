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

// In a real app, you'd want to configure this in the Firebase console.
// For this prototyping environment, we'll enable them programmatically.
async function configureProviders() {
    const response = await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${firebaseConfig.projectId}/config`, {
        method: 'GET'
    });
    const config = (await response.json());

    let madeChanges = false;
    if (!config.signIn?.google) {
        config.signIn.google = {enabled: true, clientId: '', clientSecret: ''};
        madeChanges = true;
    }

    if (!config.signIn?.github) {
        config.signIn.github = {enabled: true, clientId: '', clientSecret: ''};
        madeChanges = true;
    }

    if (madeChanges) {
        await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${firebaseConfig.projectId}/config`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(config)
        });
    }
}

if (typeof window !== 'undefined') {
    // We only want to run this configuration logic in the browser.
    // And because it's async, we'll wrap it in an immediately-invoked function expression.
    (async () => {
        try {
            await configureProviders();
            // This persistence is useful for the development environment.
            await setPersistence(auth, inMemoryPersistence);
        } catch (e) {
            console.error("Could not configure providers", e);
        }
    })();
}
