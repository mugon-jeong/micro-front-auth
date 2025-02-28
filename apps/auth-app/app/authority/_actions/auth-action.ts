"use server";
import { authApi } from "@/lib/api";
import { ApiResponse } from "@workspace/common/lib/api";
import { RolesResponse } from "./auth-action.type";

export const getAllPermissions = async () => {
  return authApi
    .get("api/v1/auth/services", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    .json<ApiResponse<RolesResponse>>();
};
