import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCgHI73cEaPKHlqCDlM50u2e3FkVduMtbY",
  authDomain: "emed-fb2c2.firebaseapp.com",
  projectId: "emed-fb2c2",
  storageBucket: "emed-fb2c2.appspot.com",
  messagingSenderId: "414598720048",
  appId: "1:414598720048:web:9fa0c739eb5b45e369dbf5",
  measurementId: "G-H7V9X1HMFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export default app;