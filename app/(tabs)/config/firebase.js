import { firebase } from '@react-native-firebase/app';

// Puedes usar la configuración que te ha proporcionado Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAm9Y3r0oqbmWJlohIw7w_BHsAwHcvzQeI', // Aquí va tu API Key
  authDomain: 'snoop-dog-1d325.firebaseapp.com',
  projectId: 'snoop-dog-1d325',
  storageBucket: 'snoop-dog-1d325.firebasestorage.app',
  messagingSenderId: '632211997513',
  appId: '1:632211997513:android:d9d4bef1c50c330ad8d098',
  measurementId: 'G-1ZBLEC9QHJ', // Si tienes un ID de medición
};

// Inicializa Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Si ya está inicializado, utiliza la instancia existente
}

export { firebase };
