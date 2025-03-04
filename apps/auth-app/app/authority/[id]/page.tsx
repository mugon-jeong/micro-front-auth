import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Plus, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { getTranslations } from "next-intl/server";
import { getAllPermissions, getAllAuthorities } from "../_actions/auth-action";
import { RoleInfo } from "../_actions/auth-action.type";
import Link from "next/link";
import { PermissionList } from "../_components/permission-list";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const authority = (await getAllAuthorities()).data.filter(
    (item) => item.id === id
  )[0];
  if (authority === undefined) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center mt-30">
        <Link href="/authority" replace>
          <Button variant="ghost" className="w-fit cursor-pointer">
            ← 뒤로가기
          </Button>
        </Link>
        <div>권한이 없습니다.</div>
      </div>
    );
  }
  const t = await getTranslations("Authority.detail");
  const { data } = await getAllPermissions();
  const getAvailablePermissions = (
    category: string,
    currentPermissions: string[]
  ) => {
    const categoryRoles = data.roles[category] || [];
    return categoryRoles.filter(
      (roleInfo: RoleInfo) => !currentPermissions.includes(roleInfo.role)
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {authority.ko} / {authority.en}
        </h1>
        <Badge variant="outline">{authority.siteName}</Badge>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(data.roles).map(([category]) => {
          const authorityRoles = authority.roles[category] || [];
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    {t("title")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {authorityRoles.map((role) => (
                      <Badge key={role.role} variant="secondary">
                        {role.role}
                      </Badge>
                    ))}
                  </div>

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between"
                      >
                        {t("addPermission")}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <PermissionList
                        availablePermissions={getAvailablePermissions(
                          category,
                          authorityRoles.map((r) => r.role)
                        )}
                        searchPlaceholder={t("searchPermission")}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
