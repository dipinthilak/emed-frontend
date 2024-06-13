import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FireBase_Api_KEY,
  authDomain: import.meta.env.VITE_FireBase_authDomain,
  projectId: import.meta.env.VITE_FireBase_projectId,
  storageBucket: import.meta.env.VITE_FireBase_storageBucket,
  messagingSenderId: import.meta.env.VITE_FireBase_messagingSenderId,
  appId: import.meta.env.VITE_FireBase_appId,
  measurementId: import.meta.env.VITE_FireBase_measurementId
};





const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export default app;