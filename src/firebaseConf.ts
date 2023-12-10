import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTpfca1eiQja6T5pVSDam4_RzcVPRg46w',
  authDomain: 'kambam-64c87.firebaseapp.com',
  projectId: 'kambam-64c87',
  storageBucket: 'kambam-64c87.appspot.com',
  messagingSenderId: '721663393202',
  appId: '1:721663393202:web:f939fa081a6d31dbd6b8ab',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
