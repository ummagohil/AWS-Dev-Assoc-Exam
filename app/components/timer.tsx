import { useEffect, useRef, useState } from "react";

export default function Timer({ resetScore, resetAnsweredQuestions }: any) {
  const [timeLeft, setTimeLeft] = useState<number>(130 * 60); // 130 minutes in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const clearTimer = () => {
    setIsRunning(false);
    setTimeLeft(130 * 60); // Reset to 130 minutes
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    resetScore();
    resetAnsweredQuestions();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="text-blue-500"
        style={{ fontSize: "60px", fontWeight: "bold" }}
      >
        {formatTime(timeLeft)}
      </div>
      <div>
        <button
          className="text-blue-500 bg-white rounded-xl p-2 m-2"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="text-blue-500 bg-white rounded-xl p-2 m-2"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button
          className="text-blue-500 bg-white rounded-xl p-2 m-2"
          onClick={clearTimer}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
