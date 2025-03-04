"use server";
import { authApi } from "@/lib/api";
import { ApiResponse } from "@workspace/common/lib/api";
import { Base, CreateRole, Permissions, Authority } from "./auth-action.type";
import { revalidateTag } from "next/cache";

export const getAllPermissions = async () => {
  return authApi
    .get("api/v1/auth/services", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    .json<ApiResponse<Permissions>>();
};

export const createRole = async (req: CreateRole) => {
  const response = await authApi
    .post("api/v1/auth", {
      json: req,
    })
    .json<ApiResponse<Base>>();
  if (response.code === "0000") {
    revalidateTag("getAllAuthorities");
  }
  return response;
};

export const getAllAuthorities = async () => {
  return authApi
    .get("api/v1/auth", {
      cache: "force-cache",
      next: { revalidate: 3600, tags: ["getAllAuthorities"] },
    })
    .json<ApiResponse<Authority[]>>();
};

export const updateAuthorityName = async (req: {
  id: string;
  ko: string;
  en: string;
}) => {
  const response = await authApi
    .put(`api/v1/auth/${req.id}/name`, {
      json: {
        ko: req.ko,
        en: req.en,
      },
    })
    .json<ApiResponse<Base>>();

  if (response.code === "0000") {
    revalidateTag("getAllAuthorities");
  }
  return response;
};

export const updateAuthorityPermission = async (req: {
  id: string;
  roles: {
    [key: string]: string[];
  };
}) => {
  const response = await authApi
    .put(`api/v1/auth/${req.id}/roles`, {
      json: {
        roles: req.roles,
      },
    })
    .json<ApiResponse<Base>>();
  if (response.code === "0000") {
    revalidateTag("getAllAuthorities");
  }
  return response;
};
