"use server";

import { createSafeActionClient } from "next-safe-action";
import { ScoreSchema } from "../../../types/score-schema";
import { db } from "..";
import { scores } from "../schema";

const cooldownMap = new Map<string, number>();

const actionClient = createSafeActionClient();

export const sendScore = actionClient
  .inputSchema(ScoreSchema)
  .action(async ({ parsedInput: { score, nick } }) => {
    const headerList = await import("next/headers").then((m) => m.headers());
    const ip =
      headerList.get("x-forwarded-for") ??
      headerList.get("x-real-ip") ??
      "unknown";

    const now = Date.now();
    const lastSubmit = cooldownMap.get(ip);
    if (lastSubmit && now - lastSubmit < 20000) {
      return { error: "You can submit only once every 20 seconds." };
    }

    cooldownMap.set(ip, now);

    try {
      await db.insert(scores).values({
        nick,
        score,
      });

      return {
        success: "Your score saved!",
        data: { score, nick },
      };
    } catch (error) {
      console.error("An error occurred", error);
      return { error: "Something went wrong!" };
    }
  });
