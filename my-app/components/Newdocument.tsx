'use client';

import { useRouter } from 'next/navigation'
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDocument } from "@/actions/action";

function Newdocument() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleCreateNewDocument = async () => {
    const { docId } = await createNewDocument();
    router.push(`/doc/${docId}`);
  };

  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "...Creating" : "New Document"}
      </Button>
    </div>
  );
}

export default Newdocument;
