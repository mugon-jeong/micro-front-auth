import { api } from "@workspace/common/lib/api";

export const authApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/auth-service/`,
}));

export const siteApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/admin-service/`,
}));
