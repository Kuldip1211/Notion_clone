"use client"

import { db } from "@/firebase";
import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";



function SlidebarOption({herf , Id }: {
 hrfe : string;
 id : string ;
}) {
 const [data ,loading ,error] = useDocumentData(doc(db,"documents"),Id);
  return (
    <div>
      <Link href={herf} className={`border p-2 rounded-sm $ {isActive ?  " bg-gray-300 font-bold border-black" : "border-gray-400"}`}>
      <p className="truncate">{data.title}</p>
      </Link>
    </div>
  )
}

export default SlidebarOption
