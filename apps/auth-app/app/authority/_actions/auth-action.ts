"use server";
import { authApi } from "@/lib/api";
import { ApiResponse } from "@workspace/common/lib/api";
import { Base, CreateRole, Permissions, Authority } from "./auth-action.type";

export const getAllPermissions = async () => {
  return authApi
    .get("api/v1/auth/services", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    .json<ApiResponse<Permissions>>();
};

export const createRole = async (req: CreateRole) => {
  return authApi
    .post("api/v1/auth", {
      json: req,
    })
    .json<ApiResponse<Base>>();
};

export const getAllAuthorities = async () => {
  return authApi.get("api/v1/auth").json<ApiResponse<Authority[]>>();
};
