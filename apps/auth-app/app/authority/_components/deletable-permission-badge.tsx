"use client";

import { Badge } from "@workspace/ui/components/badge";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateAuthorityPermission } from "../_actions/auth-action";

interface DeletablePermissionBadgeProps {
  role: string;
  category: string;
  authorityId: string;
  allRoles: {
    [key: string]: string[];
  };
}

export function DeletablePermissionBadge({
  role,
  category,
  authorityId,
  allRoles,
}: DeletablePermissionBadgeProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const updatedRoles = {
      ...allRoles,
      [category]: (allRoles[category] || []).filter((r) => r !== role),
    };
    const response = await updateAuthorityPermission({
      id: authorityId,
      roles: updatedRoles,
    });
    if (response.code === "0000") {
      router.refresh();
    }
  };

  return (
    <Badge variant="secondary" className="group flex items-center gap-1">
      {role}
      <X
        className="h-3 w-3 cursor-pointer hover:text-destructive"
        onClick={handleDelete}
      />
    </Badge>
  );
}
