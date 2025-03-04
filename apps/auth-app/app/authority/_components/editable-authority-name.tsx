"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { updateAuthorityName } from "../_actions/auth-action";
import { useRouter } from "next/navigation";

interface EditableAuthorityNameProps {
  id: string;
  ko: string;
  en: string;
}

export function EditableAuthorityName({
  id,
  ko,
  en,
}: EditableAuthorityNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [koValue, setKoValue] = useState(ko);
  const [enValue, setEnValue] = useState(en);
  const router = useRouter();

  const handleSubmit = async () => {
    await updateAuthorityName({
      id,
      ko: koValue,
      en: enValue,
    });
    setIsEditing(false);
    router.refresh();
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <Input
            value={koValue}
            onChange={(e) => setKoValue(e.target.value)}
            placeholder="한글 이름"
            className="h-8"
          />
          <Input
            value={enValue}
            onChange={(e) => setEnValue(e.target.value)}
            placeholder="English name"
            className="h-8"
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSubmit}>
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setKoValue(ko);
              setEnValue(en);
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <h1
      className="text-2xl font-bold cursor-pointer hover:text-primary"
      onClick={() => setIsEditing(true)}
    >
      {ko} / {en}
    </h1>
  );
}
