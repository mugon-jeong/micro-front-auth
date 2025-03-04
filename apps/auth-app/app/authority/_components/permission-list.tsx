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

interface PermissionListProps {
  availablePermissions: RoleInfo[];
  searchPlaceholder?: string;
}

export function PermissionList({
  availablePermissions,
  searchPlaceholder = "Search permissions...",
}: PermissionListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPermissions = availablePermissions.filter(
    (role) =>
      role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg">
      <Input
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-8"
      />
      <div className="flex flex-wrap gap-2">
        {filteredPermissions.map((roleInfo) => (
          <TooltipProvider key={roleInfo.role}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
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
