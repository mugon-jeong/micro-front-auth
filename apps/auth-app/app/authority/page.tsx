import React, { Suspense } from "react";
import AuthoritySection from "@/app/authority/_components/authority-section";
import AuthorityCreateModal from "@/app/authority/_components/authority-create-modal";
import { getTranslations } from "next-intl/server";
import { getAllAuthorities } from "./_actions/auth-action";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

const Page = async () => {
  const t = await getTranslations("Authority");
  const authorities = getAllAuthorities().then((res) => res.data);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className={"flex items-center justify-between"}>
        <h2 className="text-2xl font-bold">{t("list.title")}</h2>
        <AuthorityCreateModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("create.title")}
          </Button>
        </AuthorityCreateModal>
      </div>
      <section className="flex flex-1 flex-col gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthoritySection data={authorities} />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
