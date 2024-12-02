"use server";
import { admindb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  // Retrieve the session claims using Clerk's auth() method
  const { sessionClaims } = await auth();

  if (!sessionClaims || !sessionClaims.email) {
    throw new Error("Unauthorized: User email is missing or session invalid.");
  }

  // Create a new document in the "documents" collection
  const docCollection = admindb.collection("documents");
  const docref = await docCollection.add({
    title: "New Doc",
  });

  // Add the document reference to the user's "rooms" collection
  await admindb
    .collection("users")
    .doc(sessionClaims?.email!) // Ensure email exists and is used correctly
    .collection("rooms")
    .doc(docref.id)
    .set({
      useId: sessionClaims.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docref.id,
    });

  return { docID: docref.id };
}
