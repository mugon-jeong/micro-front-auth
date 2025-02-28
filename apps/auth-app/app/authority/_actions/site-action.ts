import { siteApi } from "@/lib/api";
import { ApiPageResponse } from "@workspace/common/lib/api";
import { Site } from "./site-action.type";

export const getAllSites = async ({
  page,
  name,
}: {
  page: number;
  name: string;
}) => {
  return siteApi
    .get("api-admin/v1/sites", {
      cache: "force-cache",
      next: { revalidate: 3600 },
      searchParams: {
        page: page,
        name: name,
        size: "10",
      },
    })
    .json<ApiPageResponse<Site>>();
};
