import { api } from "@workspace/common/lib/api";

export const coreApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/core-service/`,
}));
