"use server";
import { db } from "@/server";
import { scores } from "@/server/schema";
import { desc } from "drizzle-orm";

export async function getHighScore() {
  const result = await db
    .select()
    .from(scores)
    .orderBy(desc(scores.score))
    .limit(1);

  return {
    score: result[0]?.score ?? 0,
    nick: result[0]?.nick ?? "No Record",
  };
}
