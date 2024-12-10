'use client';

import { MenuIcon } from "lucide-react";
import Newdocument from "./Newdocument";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore"; // Ensure "where" is imported
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import SlidebarOption from "./SlidebarOption";

interface RoomDocument {
  id: string; // Explicitly define the document ID
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Slidbar() {
  const { user } = useUser();
  console.log("User Email:", user?.emailAddresses[0]?.emailAddress);

  const [groupData, setGroupData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user?.emailAddresses[0]?.emailAddress)
      )
  );

  useEffect(() => {
    if (!data) return;

    console.log("Raw Firestore Data:", data.docs.map((doc) => doc.data()));
    console.log("Document IDs:", data.docs.map((doc) => doc.id));

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        const docId = curr.id;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: docId,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: docId,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );

    setGroupData(grouped);
  }, [data]);

  const menuoption = (
    <>
      <Newdocument />
      {groupData.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">No Document Found</h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
          {groupData.owner.map((doc) => (
            <div key={doc.id}>
              <SlidebarOption id={doc.id} href={`/doc/${doc.id}`} />
              <p>{doc.id} - My Document</p>
            </div>
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuoption}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">
        <Newdocument />
        {menuoption}
      </div>
    </div>
  );
}

export default Slidbar;
