import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "dotenv/config";

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
  databaseURL: process.env.databaseURL
};

const app = firebase.initializeApp(config);

export const db = firebase.database(app);
