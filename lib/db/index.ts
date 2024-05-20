import { drizzle } from "drizzle-orm/postgres-js";
// import * as schema from "../db/schema";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("environment variable DATABASE_URL undefined");
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { logger: true });
