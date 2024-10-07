import Container from "./UI/Container.tsx";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timers-context.tsx";
import { useEffect, useState, useRef } from "react";

export default function Timer({ name, duration }: TimerProps) {
  const intervalRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();

  useEffect(() => {
    // Function to clear the interval
    function clearTimer() {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    if (isRunning && remainingTime > 0) {
      intervalRef.current = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 50) {
            clearTimer(); // Clear interval when remaining time is low enough
            return 0;
          }
          return prevTime - 50;
        });
      }, 50);
    } else {
      clearTimer();
    }

    // Cleanup function to ensure no memory leaks
    return () => {
      clearTimer();
    };
  }, [isRunning, remainingTime]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
