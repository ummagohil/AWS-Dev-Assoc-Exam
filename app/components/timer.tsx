import { useEffect, useRef, useState } from "react";

export default function Timer() {
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
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Countdown Timer</h1>
      <div
        style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}
      >
        {formatTime(timeLeft)}
      </div>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={clearTimer}>Clear</button>
      </div>
    </div>
  );
}
