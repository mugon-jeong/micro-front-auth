import React from "react";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import AuthoritySection from "@/app/authority/_components/authority-section";

// Sample data
const siteData = [
  {
    id: "1",
    siteId: "1",
    siteName: "Main Site",
    ko: "어드민",
    en: "admin",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "2",
    siteId: "1",
    siteName: "Main Site",
    ko: "사용자",
    en: "user",
    permissions: {
      core: ["read"],
      material: ["read"],
    },
  },
  {
    id: "3",
    siteId: "1",
    siteName: "Main Site",
    ko: "매니저",
    en: "manager",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "4",
    siteId: "1",
    siteName: "Main Site",
    ko: "게스트",
    en: "guest",
    permissions: {
      core: ["read"],
      material: [],
    },
  },
  {
    id: "5",
    siteId: "1",
    siteName: "Main Site",
    ko: "테스터",
    en: "tester",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "6",
    siteId: "1",
    siteName: "Main Site",
    ko: "슈퍼바이저",
    en: "supervisor",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "7",
    siteId: "1",
    siteName: "Main Site",
    ko: "오퍼레이터",
    en: "operator",
    permissions: {
      core: ["read"],
      material: ["read"],
    },
  },
  {
    id: "8",
    siteId: "1",
    siteName: "Main Site",
    ko: "엔지니어",
    en: "engineer",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "9",
    siteId: "1",
    siteName: "Main Site",
    ko: "게스트2",
    en: "guest2",
    permissions: {
      core: ["read"],
      material: [],
    },
  },
  {
    id: "10",
    siteId: "1",
    siteName: "Main Site",
    ko: "매니저2",
    en: "manager2",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "11",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "관리자",
    en: "admin",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "12",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "게스트",
    en: "guest",
    permissions: {
      core: ["read"],
      material: [],
    },
  },
  {
    id: "13",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "매니저",
    en: "manager",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "14",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "사용자",
    en: "user",
    permissions: {
      core: ["read"],
      material: ["read"],
    },
  },
  {
    id: "15",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "테스터",
    en: "tester",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "16",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "슈퍼바이저",
    en: "supervisor",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "17",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "엔지니어",
    en: "engineer",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "18",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "오퍼레이터",
    en: "operator",
    permissions: {
      core: ["read"],
      material: ["read"],
    },
  },
  {
    id: "19",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "게스트2",
    en: "guest2",
    permissions: {
      core: ["read"],
      material: [],
    },
  },
  {
    id: "20",
    siteId: "2",
    siteName: "Secondary Site",
    ko: "매니저2",
    en: "manager2",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "21",
    siteId: "3",
    siteName: "Test Site",
    ko: "테스터",
    en: "tester",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "22",
    siteId: "3",
    siteName: "Test Site",
    ko: "게스트",
    en: "guest",
    permissions: {
      core: ["read"],
      material: [],
    },
  },
  {
    id: "23",
    siteId: "3",
    siteName: "Test Site",
    ko: "매니저",
    en: "manager",
    permissions: {
      core: ["read", "write"],
      material: ["read"],
    },
  },
  {
    id: "24",
    siteId: "3",
    siteName: "Test Site",
    ko: "사용자",
    en: "user",
    permissions: {
      core: ["read"],
      material: ["read"],
    },
  },
  {
    id: "25",
    siteId: "3",
    siteName: "Test Site",
    ko: "어드민",
    en: "admin",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
  {
    id: "26",
    siteId: "3",
    siteName: "Test Site",
    ko: "엔지니어",
    en: "engineer",
    permissions: {
      core: ["read", "write"],
      material: ["read", "write"],
    },
  },
];

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className={"flex items-center justify-between"}>
        <h2 className="text-2xl font-bold">권한 관리</h2>
        <Button>
          <Plus />
        </Button>
      </div>
      <section className="flex flex-1 flex-col gap-6">
        <AuthoritySection data={siteData} />
      </section>
    </div>
  );
};

export default Page;
