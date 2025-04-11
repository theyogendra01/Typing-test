import { useState, useEffect } from 'react';
import styles from '../styles/Timer.module.css';

function Timer({ isActive, startTime, endTime }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && startTime && !endTime) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100); // Update more frequently for better responsiveness
    } else if (endTime && startTime) {
      setTime(Math.floor((endTime - startTime) / 1000));
    } else {
      setTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, endTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={styles.timer}>
      <div className={styles.time}>{formatTime(time)}</div>
      <div className={styles.label}>Time</div>
    </div>
  );
}

export default Timer;
