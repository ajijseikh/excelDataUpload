// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyAdlJR1mAUr7gHrfllmfVYvwaZU-2HoJrU" ,
  authDomain:"excel-data-upload.firebaseapp.com",
  projectId:"excel-data-upload",
  storageBucket:"excel-data-upload.appspot.com",
  messagingSenderId:"947688028759",
  appId:"1:947688028759:web:d72b79c07637f32e62c112",
  measurementId: "G-YG1VDSZLS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);