import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBm3nCfSG6PWAfZCO0nE07vxfJ8JFCvP1A",
  authDomain: "grupo11-pi.firebaseapp.com",
  projectId: "grupo11-pi",
  storageBucket: "grupo11-pi.appspot.com",
  messagingSenderId: "431820560794",
  appId: "1:431820560794:web:ca4e34dcabf6eb6d3bc223"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp