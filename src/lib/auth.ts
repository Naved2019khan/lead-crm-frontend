import { signInNetworkCall } from "@/services/api/auth-api";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import "dotenv/config";   // ← this loads .env.local automatically

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    pages: {
    signIn: '/',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
   
      async authorize(credentials) {
        try {
          const user = await signInNetworkCall({ payload: credentials });
          if (!user) return null; // return null on failure
          return user; // must be plain object
        } catch (err) {
          console.error("Authorize error:", err);
          return null; // Prevent crash
        }
      },
    }),
    
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? "fallback-secret-for-dev-only",
  callbacks: {
    async jwt({ token, user }) {
      try{
        if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
      }
      catch{
        console.warn("Error in jwt callback", token, user);
      }
    },
    async session({ session, token }) {
        session.user = {
        id: token.id as number,
        email: token.email as string,
        token: token.token as string
      };
      return session;
    },
  },
});