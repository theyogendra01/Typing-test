import { useRef, useEffect } from 'react';
import styles from '../styles/TextDisplay.module.css';

function TextDisplay({ text, userInput }) {
  const containerRef = useRef(null);
  
  // Split text into words and characters
  const words = text.split(' ');
  const userInputWords = userInput.split(' ');
  const currentWordIndex = userInputWords.length - 1;
  const currentUserWord = userInputWords[currentWordIndex] || '';
  
  // Focus the container when clicked
  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={styles.textDisplay} 
      onClick={handleClick}
      tabIndex="0"
    >
      <div className={styles.words}>
        {words.map((word, wordIndex) => (
          <div 
            key={wordIndex} 
            className={`${styles.word} ${
              wordIndex === currentWordIndex ? styles.currentWord : 
              wordIndex < currentWordIndex ? styles.pastWord : 
              styles.futureWord
            }`}
          >
            {word.split('').map((char, charIndex) => {
              let charClass = styles.char;
              
              // Apply styling to current word characters
              if (wordIndex === currentWordIndex) {
                if (charIndex < currentUserWord.length) {
                  if (char === currentUserWord[charIndex]) {
                    charClass = `${styles.char} ${styles.correct}`;
                  } else {
                    charClass = `${styles.char} ${styles.incorrect}`;
                  }
                } else if (charIndex === currentUserWord.length) {
                  charClass = `${styles.char} ${styles.current}`;
                }
              }
              
              // Apply styling to past words
              else if (wordIndex < currentWordIndex) {
                const pastUserWord = userInputWords[wordIndex] || '';
                if (charIndex < pastUserWord.length) {
                  if (char === pastUserWord[charIndex]) {
                    charClass = `${styles.char} ${styles.correct}`;
                  } else {
                    charClass = `${styles.char} ${styles.incorrect}`;
                  }
                }
              }
              
              return (
                <span key={charIndex} className={charClass}>
                  {char}
                </span>
              );
            })}
            {wordIndex !== words.length - 1 && <span className={styles.space}>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextDisplay;
