import ky from "ky";
import { auth } from "@workspace/common/auth";
import { getSession } from "next-auth/react";

export interface ApiResponse<T> {
  code: string;
  data: T;
}

export interface PageInfo<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export interface ApiPageResponse<T> {
  code: string;
  data: PageInfo<T>;
}

// Usage example:
// const response: ApiPageResponse<YourType> = await fetchData();

const isServer = typeof window === "undefined";

const PREFIX_URL = (() => {
  if (isServer) return process.env.API_BASE_URL;
  return process.env.NEXT_PUBLIC_API_BASE_URL;
})();

export const api = ky.create({
  prefixUrl: PREFIX_URL,
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
            `Bearer ${session.token.accessToken}`
          );
        }
      },
    ],
  },
});
