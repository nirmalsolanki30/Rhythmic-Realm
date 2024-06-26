import {getApp, getApps, initializeApp} from 'firebase/app'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGIN_ID,
  appId: import.meta.env.VITE_FIREBASE_APPI_ID,
  };

const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig);
const storage=getStorage(app);

export {app, storage};