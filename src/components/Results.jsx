import styles from '../styles/Results.module.css';

function Results({ results, resetTest, onShare, mode }) {
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
        <button onClick={resetTest} className={styles.retryButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          retry
        </button>
        
        <button onClick={onShare} className={styles.shareButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.12759C7.54305 8.43658 6.7317 8 5.82353 8C4.26728 8 3 9.26728 3 10.8235C3 12.3798 4.26728 13.6471 5.82353 13.6471C6.7317 13.6471 7.54305 13.2105 8.08261 12.5195L15.0227 16.2765C15.0077 16.3979 15 16.5216 15 16.6471C15 18.3039 16.3431 19.6471 18 19.6471C19.6569 19.6471 21 18.3039 21 16.6471C21 14.9902 19.6569 13.6471 18 13.6471C17.0918 13.6471 16.2805 14.0837 15.7409 14.7747L8.80082 11.0177C8.81584 10.8963 8.82353 10.7725 8.82353 10.6471C8.82353 10.5216 8.81584 10.3979 8.80082 10.2765L15.7409 6.51948C16.2805 7.21049 17.0918 7.64706 18 7.64706" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          share
        </button>
      </div>
    </div>
  );
}

export default Results;
