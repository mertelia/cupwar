import { useCupStore } from "@/store/store";
import { useEffect, useState } from "react";
import AfterUI from "./AfterUI";
import NewRecord from "./NewRecord";
import AfterGameResetLogic from "./AfterGameResetLogic";
import { getHighScore } from "./GetHightScore";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
export default function GameEnd() {
  const points = useCupStore((s) => s.points);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highScore, setHighScore] = useState<{
    nick: string;
    score: number;
  } | null>(null);

  useEffect(() => {
    const checkRecord = async () => {
      setLoading(true);
      try {
        const data = await getHighScore();
        setHighScore(data);
        if (points > data.score) {
          setIsNewRecord(true);
        }
      } catch (error) {
        console.error("no score", error);
      } finally {
        setLoading(false);
      }
    };
    checkRecord();
  }, []);

  if (loading) return <div className="h-20" />;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loader" exit={{ opacity: 0 }}></motion.div>
        ) : (
          <motion.div key="content">
            {!isNewRecord && highScore && (
              <>
                <AfterUI highScore={highScore} />
                <AfterGameResetLogic />
              </>
            )}
            {isNewRecord && <NewRecord />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
