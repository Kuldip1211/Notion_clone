'use client';

import { useRouter } from 'next/navigation'
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDocument } from "@/actions/action";

function Newdocument() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleCreateNewDocument = async () => {
    startTransition(true);
    const { docId } = await createNewDocument();
    router.push(`/doc/${docId}`);
    startTransition(false);
  };

  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "...Creating" : "NewDocument"}
      </Button>
    </div>
  );
}

export default Newdocument;
