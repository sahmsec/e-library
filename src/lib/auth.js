import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { getDb, getMongoClient } from "@/lib/mongodb";

const hasGoogleCredentials = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);

export const auth = betterAuth({
  appName: "E-Library",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "dev-secret-change-me-before-production",
  database: mongodbAdapter(getDb(), {
    client: getMongoClient(),
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: hasGoogleCredentials
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          prompt: "select_account",
        },
      }
    : {},
  plugins: [nextCookies()],
});
