"use server";

import { createSafeActionClient } from "next-safe-action";
import { ScoreSchema } from "../../../types/score-schema";
import { db } from "..";
import { scores } from "../schema";
import { headers } from "next/headers";

const actionClient = createSafeActionClient();
export const sendScore = actionClient
  .inputSchema(ScoreSchema)
  .action(async ({ parsedInput: { score, nick } }) => {
    const headerList = await headers();
    const country = headerList.get("x-vercel-ip-country") || "Unknown";

    try {
      await db.insert(scores).values({
        nick: nick,
        score: score,
        country: country,
      });

      return { success: "Saved!", country };
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong!" };
    }
  });
