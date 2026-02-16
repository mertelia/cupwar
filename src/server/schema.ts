import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const scores = pgTable("scores", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nick: text("nick").notNull(),
  score: integer().notNull(),
  date: timestamp("date").defaultNow().notNull(),
  country: text("country"),
});
