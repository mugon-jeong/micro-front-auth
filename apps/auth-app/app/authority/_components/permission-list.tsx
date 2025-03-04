"use client";

import React, { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { RoleInfo } from "../_actions/auth-action.type";
import { updateAuthorityPermission } from "../_actions/auth-action";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";

interface PermissionListProps {
  availablePermissions: RoleInfo[];
  searchPlaceholder?: string;
  authorityId: string;
  category: string;
  currentPermissions: string[];
  onPermissionAdd?: () => void;
  allRoles: {
    [key: string]: string[];
  };
}

export function PermissionList({
  availablePermissions,
  searchPlaceholder = "Search permissions...",
  authorityId,
  category,
  currentPermissions,
  onPermissionAdd,
  allRoles,
}: PermissionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<RoleInfo[]>([]);
  const router = useRouter();

  const handleAddPermission = (roleInfo: RoleInfo) => {
    setSelectedRoles((prev) => [...prev, roleInfo]);
  };

  const handleSave = async () => {
    const updatedRoles = {
      ...allRoles,
      [category]: [...currentPermissions, ...selectedRoles.map((r) => r.role)],
    };

    const response = await updateAuthorityPermission({
      id: authorityId,
      roles: Object.fromEntries(
        Object.entries(updatedRoles).map(([key, roles]) => [key, roles])
      ),
    });

    if (response.code === "0000") {
      setSelectedRoles([]);
      router.refresh();
      onPermissionAdd?.();
    }
  };

  const filteredPermissions = availablePermissions
    .filter((role) => !selectedRoles.some((s) => s.role === role.role))
    .filter(
      (role) =>
        role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg">
      <div className="flex gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8"
        />
        {selectedRoles.length > 0 && (
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedRoles.map((roleInfo) => (
          <TooltipProvider key={roleInfo.role}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="default"
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedRoles((prev) =>
                      prev.filter((r) => r.role !== roleInfo.role)
                    )
                  }
                >
                  {roleInfo.role}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{roleInfo.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {filteredPermissions.map((roleInfo) => (
          <TooltipProvider key={roleInfo.role}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleAddPermission(roleInfo)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {roleInfo.role}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{roleInfo.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
