import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    expires_at: number;
    error?: "RefreshTokenError";
  }
}

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken: string;
    refreshToken: string;
    expires_at: number;
  }

  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    error?: "RefreshTokenError";
    token?: JWT;
  }
}

interface JwtType extends JwtPayload {
  id?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        console.log("credentials", credentials);
        // login
        const response = await fetch(
          `${process.env.API_BASE_URL}/admin-service/api-admin/v1/auth/sign-in`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberId: username,
              memberPw: password,
            }),
          },
        ).then((res) => res.json());
        console.log("response", response);
        const decode = jwtDecode<JwtType>(response.data.accessToken);

        if (
          !response.data ||
          decode.id === undefined ||
          decode.exp === undefined
        ) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return {
          id: decode.id,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expires_at: decode.exp,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          id: user.id || token.id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expires_at: user.expires_at,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return {
          id: token.id,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          expires_at: token.expires_at,
        };
      } else {
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");
        try {
          console.log("refresh token");
          const response = await fetch(
            `${process.env.API_BASE_URL}/admin-service/api-admin/v1/auth/refresh`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.refreshToken}`,
              },
            },
          ).then((res) => res.json());
          const decode = jwtDecode<JwtType>(response.data.accessToken);
          return {
            id: decode.id || token.id,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expires_at: decode.exp || token.expires_at,
          };
        } catch (e) {
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    session: async ({ session, token }) => {
      session.error = token.error;
      session.token = token;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
