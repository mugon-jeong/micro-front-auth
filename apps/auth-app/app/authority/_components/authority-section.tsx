"use client";
import React, { use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Button } from "@workspace/ui/components/button";
import { ChevronDown, Plus } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Authority } from "../_actions/auth-action.type";
import { AuthorityCard } from "./authority-card";
import { Card } from "@workspace/ui/components/card";
import AuthorityCreateModal from "./authority-create-modal";
import { useTranslations } from "next-intl";

interface AuthoritySectionProps {
  data: Promise<Authority[]>;
}

const AuthoritySection = ({ data }: AuthoritySectionProps) => {
  const allAuthorities = use(data);
  const t = useTranslations("Authority.create");
  const groupedData = React.useMemo(() => {
    const groups: Record<string, Authority[]> = {};

    allAuthorities.forEach((item) => {
      if (!groups[item.siteId]) {
        groups[item.siteId] = [];
      }
      groups[item.siteId]!.push(item);
    });

    return groups;
  }, [data]);

  // State to store search terms for each section
  const [searchTerms, setSearchTerms] = React.useState<Record<string, string>>(
    {}
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
        item.en.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="mb-4 flex gap-4 items-center">
                <Input
                  placeholder="검색어를 입력하세요..."
                  value={searchTerms[siteId] || ""}
                  onChange={(e) => updateSearchTerm(siteId, e.target.value)}
                  className="flex-1 h-11"
                />
                <AuthorityCreateModal siteId={siteId}>
                  <Card className="shadow-sm flex items-center gap-2 px-4 h-11 border-dashed cursor-pointer hover:border-primary hover:bg-primary/5">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground whitespace-nowrap">
                      {t("title")}
                    </p>
                  </Card>
                </AuthorityCreateModal>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterItems(items, searchTerms[siteId] || "").map(
                  (item, index) => (
                    <AuthorityCard
                      key={item.id}
                      authority={item}
                      index={index}
                    />
                  )
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
};

export default AuthoritySection;
