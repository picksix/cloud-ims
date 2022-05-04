import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const app = initializeApp({
  apiKey: 'AIzaSyAZlaCmO4cQuJ02qMaucv8t6Adi5oAtO5o',
  authDomain: 'my-project-final-349202.firebaseapp.com',
  // databaseURL: 'my-project-final-349202.firebaseio.com',
  projectId: 'my-project-final-349202',
  storageBucket: 'my-project-final-349202.appspot.com',
  messagingSenderId: '696948991776',
  appId: '1:696948991776:web:3846ece3c7930bd3e1d945',
  measurementId: 'G-GZH0QE1RC9',
});

// eslint-disable-next-line import/prefer-default-export
export const db = getDatabase(app);
