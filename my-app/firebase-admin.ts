import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import * as admin from 'firebase-admin'; // Use `admin` for Firestore access with Admin SDK
import servicekey from '@/services_privetkey.json';  // Path to your Firebase service key

let app;

if (getApps().length === 0) {
  // Initialize app only if not already initialized
  app = initializeApp({
    credential: cert(servicekey),  // Path to your service account key
  });
} else {
  app = getApp();  // Use the existing app if it's already initialized
}

// Use the Admin SDK's `admin.firestore()` to get Firestore instance
const admindb = admin.firestore();

export { app as adminApp, admindb };
