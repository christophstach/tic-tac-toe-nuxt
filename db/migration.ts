import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "@/db/client";

migrate(db, { migrationsFolder: "@/drizzle" });
