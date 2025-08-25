// auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and `getCsrfToken`
   * The `session` object is a combination of the user and the JWT.
   */
  interface Session {
    user: {
      id: string; // Tambahkan `id` di sini
    } & DefaultSession["user"];
  }
}