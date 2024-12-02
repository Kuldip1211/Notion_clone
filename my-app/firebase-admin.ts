import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import servicekey from "@/services_privetkey.json";
// Ensure this path is correct

let app;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(servicekey),
  });
} else {
  app = getApp();
}

const admindb = getFirestore(app);

export { app as adminApp, admindb };
