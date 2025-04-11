import styles from '../styles/Settings.module.css';

function Settings({
  mode,
  setMode,
  wordCount,
  setWordCount,
  resetTest
}) {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsRow}>
        <div className={styles.settingsGroup}>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.optionButton} ${mode === 'words' ? styles.active : ''}`}
              onClick={() => setMode('words')}
            >
              words
            </button>
            <button
              className={`${styles.optionButton} ${mode === 'quote' ? styles.active : ''}`}
              onClick={() => setMode('quote')}
            >
              quote
            </button>
          </div>
        </div>

        {mode === 'words' && (
          <div className={styles.settingsGroup}>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.optionButton} ${wordCount === 10 ? styles.active : ''}`}
                onClick={() => setWordCount(10)}
              >
                10
              </button>
              <button
                className={`${styles.optionButton} ${wordCount === 25 ? styles.active : ''}`}
                onClick={() => setWordCount(25)}
              >
                25
              </button>
              <button
                className={`${styles.optionButton} ${wordCount === 50 ? styles.active : ''}`}
                onClick={() => setWordCount(50)}
              >
                50
              </button>
              <button
                className={`${styles.optionButton} ${wordCount === 100 ? styles.active : ''}`}
                onClick={() => setWordCount(100)}
              >
                100
              </button>
            </div>
          </div>
        )}

        <div className={styles.settingsGroup}>
          <button className={styles.resetButton} onClick={resetTest}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.49 9C19.9828 7.56678 19.1209 6.2854 17.9845 5.27542C16.8482 4.26543 15.4745 3.55976 13.9917 3.22426C12.5089 2.88875 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.15179 19.7346 6.01545 18.7246C4.87911 17.7146 4.01718 16.4332 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
