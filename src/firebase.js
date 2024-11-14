import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAx6roay43uPivy5N4KSmQhlMQksS2_7c",
  authDomain: "onebox-f9f59.firebaseapp.com",
  projectId: "onebox-f9f59",
  storageBucket: "onebox-f9f59.firebasestorage.app",
  messagingSenderId: "35240692952",
  appId: "1:35240692952:web:9b007d1c7c9b868ea25bad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
