"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Button } from "@workspace/ui/components/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";

interface Authority {
  id: string;
  siteId: string;
  siteName: string;
  ko: string;
  en: string;
  permissions: {
    core: string[];
    material: string[];
  };
}

interface AuthoritySectionProps {
  data: Authority[];
}

const AuthoritySection = ({ data }: AuthoritySectionProps) => {
  const groupedData = React.useMemo(() => {
    const groups: Record<string, Authority[]> = {};

    data.forEach((item) => {
      if (!groups[item.siteId]) {
        groups[item.siteId] = [];
      }
      groups[item.siteId]!.push(item);
    });

    return groups;
  }, [data]);

  // State to store search terms for each section
  const [searchTerms, setSearchTerms] = React.useState<Record<string, string>>(
    {},
  );

  // Function to update search term for a specific section
  const updateSearchTerm = (siteId: string, term: string) => {
    setSearchTerms((prev) => ({ ...prev, [siteId]: term }));
  };

  // Function to filter items based on search term
  const filterItems = (items: Authority[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.ko.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.en.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedData).map(([siteId, items]) => (
        <Collapsible key={siteId} defaultOpen={false}>
          <div className="border rounded-lg p-4">
            <CollapsibleTrigger asChild className={"cursor-pointer"}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{items[0]!.siteName}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0 cursor-pointer"
                >
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  <span className="sr-only">Toggle section</span>
                </Button>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mb-4">
                <Input
                  placeholder="검색어를 입력하세요..."
                  value={searchTerms[siteId] || ""}
                  onChange={(e) => updateSearchTerm(siteId, e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterItems(items, searchTerms[siteId] || "").map((item) => (
                  <Card key={item.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>
                        <Badge>{item.id}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-muted-foreground">
                            한국어:
                          </span>
                          <span>{item.ko}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-muted-foreground">
                            English:
                          </span>
                          <span>{item.en}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                          <div className="text-xs text-muted-foreground">
                            Permissions:
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span
                              key={"core"}
                              className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              core:{item.permissions.core.length}
                            </span>
                            <span
                              key={"material"}
                              className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              material:{item.permissions.material.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default AuthoritySection;
