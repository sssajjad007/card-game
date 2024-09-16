import {useState, useEffect} from 'react';

interface TimerProps {
  isRunning: boolean;
}

const useTimer = ({isRunning}: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 500);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const resetTimer = () => {
    setTime(0);
  };

  return {time, resetTimer};
};

export default useTimer;
