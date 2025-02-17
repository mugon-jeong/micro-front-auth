import ky from "ky";
import { auth } from "@workspace/common/auth";
import { getSession } from "next-auth/react";

const api = ky.create({
  prefixUrl: process.env.API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const session =
          typeof window === "undefined" ? await auth() : await getSession();
        if (session && session.token && session.token.accessToken) {
          request.headers.set(
            "Authorization",
            `Bearer ${session.token.accessToken}`,
          );
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        const session =
          typeof window === "undefined" ? await auth() : await getSession();
        if (response.status === 401 && session) {
          window.location.href = "/auth/signin";
        }
      },
    ],
  },
});

export const coreApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/core-service/`,
}));
