import * as z from "zod";

export const ScoreSchema = z.object({
  nick: z
    .string()
    .min(3, { message: "Your nick must be at least 3 characters long." })
    .trim()
    .max(13, { message: "Your nick must be 13 characters or less" }),
  score: z.number().min(1, { message: "Score must be 1 at least" }),
});
