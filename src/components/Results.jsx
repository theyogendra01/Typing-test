import styles from '../styles/Results.module.css';

function Results({ results, resetTest, onShare, mode, onNewTest }) {
  return (
    <div className={styles.results}>
      <h2 className={styles.title}>Test Complete</h2>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.value}>{Math.round(results.wpm)}</div>
          <div className={styles.label}>WPM</div>
        </div>

        <div className={styles.stat}>
          <div className={styles.value}>{results.accuracy}%</div>
          <div className={styles.label}>Accuracy</div>
        </div>

        <div className={styles.stat}>
          <div className={styles.value}>{results.time.toFixed(1)}s</div>
          <div className={styles.label}>Time</div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={resetTest} className={styles.retryButton} title="Retry this test (Esc)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.15179 19.7346 6.01545 18.7246C4.87911 17.7146 4.01718 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          retry
        </button>

        <button onClick={onNewTest} className={styles.newTestButton} title="Start new test (Tab + Enter)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          new test
        </button>

        <button onClick={onShare} className={styles.shareButton} title="Share results">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          share
        </button>
      </div>
    </div>
  );
}

export default Results;
