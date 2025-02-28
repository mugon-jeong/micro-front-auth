import { api } from "@workspace/common/lib/api";

export const authApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/auth-service/`,
}));
