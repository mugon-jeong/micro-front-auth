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

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const t = await getTranslations("Authority.detail");

  const mockData = {
    id,
    siteId: "1",
    siteName: "Main Site",
    ko: "관리자",
    en: "Administrator",
    permissions: {
      core: ["manage:all", "admin:system", "config:all"],
      material: ["read:all", "write:all", "delete:all"],
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {mockData.ko} / {mockData.en}
        </h1>
        <Badge variant="outline">{mockData.siteName}</Badge>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(mockData.permissions).map(([category, permissions]) => (
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
                  {permissions.map((permission) => (
                    <Badge key={permission} variant="secondary">
                      {permission}
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
                    <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                      {(category === "core"
                        ? ["manage:users", "admin:logs", "config:read"]
                        : ["modify:all", "export:all", "import:all"]
                      ).map((permission) => (
                        <Badge
                          key={permission}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
