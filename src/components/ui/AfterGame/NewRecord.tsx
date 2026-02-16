import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScoreSchema } from "../../../../types/score-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCupStore } from "@/store/store";
import { useAction } from "next-safe-action/hooks";
import { sendScore } from "@/server/actions/sendScore";
export default function NewRecord() {
  const points = useCupStore((s) => s.points);
  const setSceneState = useCupStore((s) => s.setSceneState);
  const resetPoints = useCupStore((s) => s.resetPoints);
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof ScoreSchema>>({
    resolver: zodResolver(ScoreSchema),
    defaultValues: {
      nick: "",
      score: points,
    },
  });

  const { execute, status } = useAction(sendScore, {
    onSuccess(result) {
      setSceneState("idle");
      resetPoints();
    },
    onError(error) {
      console.error("An error occurred");
      setSceneState("idle");
      resetPoints();
    },
  });
  const onSubmit = (values: z.infer<typeof ScoreSchema>) => {
    execute({ nick: values.nick, score: values.score });
    resetField("nick");
  };

  return (
    <div className="flex flex-col justify-center items-center tracking-tight px-4 gap-2">
      <div className="text-xl md:text-2xl text-main font-diatype font-bold text-center">
        You beat the World Record!
      </div>
      <div className="text-xl md:text-2xl text-main font-diatype font-bold text-center">
        Please save score.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-2">
        <input
          {...register("nick")}
          className="w-full rounded-full text-lg md:text-2xl h-12 text-main text-center ring-2 ring-main outline-none font-diatype font-bold bg-transparent"
          maxLength={13}
          min={3}
          placeholder="Submit your name here"
        />
      </form>
    </div>
  );
}
