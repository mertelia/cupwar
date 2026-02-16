"use server";

import { createSafeActionClient } from "next-safe-action";
import { ScoreSchema } from "../../../types/score-schema";
import { db } from "..";
import { scores } from "../schema";

const actionClient = createSafeActionClient();

export const sendScore = actionClient
  .inputSchema(ScoreSchema)
  .action(async ({ parsedInput: { score, nick } }) => {
    try {
      await db.insert(scores).values({
        nick: nick,
        score: score,
      });
      return {
        success: "Your score saved!",
        data: { score, nick },
      };
    } catch (error) {
      console.error("An error accured", error);
      return { error: "Something went wrong!" };
    }
  });
