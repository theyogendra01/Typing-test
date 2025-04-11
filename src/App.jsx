// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import TextDisplay from './components/TextDisplay';
import TypingInput from './components/TypingInput';
import Timer from './components/Timer';
import Results from './components/Results';
import Settings from './components/Settings';
import TestControls from './components/TestControls';
import { calculateWPM, calculateAccuracy } from './utils/calculations';
import './styles/global.css';

// Fallback word list in case API fails
const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

// Text generator with API and fallback
async function generateText(count = 25, mode = 'words') {
  try {
    if (mode === 'quote') {
      // For quote mode, use the quotable API
      const response = await fetch('https://api.quotable.io/random?minLength=100&maxLength=300');
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return data.content;
    } else {
      // For words mode, use random words
      const shuffled = [...commonWords].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count).join(' ');
    }
  } catch (error) {
    console.error('Error fetching text:', error);

    // Fallback to local words
    const shuffled = [...commonWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join(' ');
  }
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const [mode, setMode] = useState('words'); // 'words', 'quote'
  const [wordCount, setWordCount] = useState(25); // 10, 25, 50, 100 words
  const [currentWPM, setCurrentWPM] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme + '-theme'; // Apply theme to body
  };

  useEffect(() => {
    // Set initial theme on body
    document.body.className = theme + '-theme';
    generateNewTest();
  }, []);

  useEffect(() => {
    generateNewTest();
  }, [mode, wordCount]);

  const generateNewTest = async () => {
    setIsLoading(true);
    try {
      const newText = await generateText(wordCount, mode);
      setText(newText);
    } catch (error) {
      console.error("Failed to generate text:", error);
      // Use fallback text
      const shuffled = [...commonWords].sort(() => 0.5 - Math.random());
      setText(shuffled.slice(0, wordCount).join(' '));
    } finally {
      resetTest();
      setIsLoading(false);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsActive(false);
    setResults(null);
    setCurrentWPM(0);
    setCurrentAccuracy(100);
    setShowShareOptions(false);
  };

  const endTest = () => {
    if (endTime) return; // Prevent multiple calls

    const end = Date.now();
    setEndTime(end);
    setIsActive(false);

    // Calculate final results
    const elapsedTime = end - startTime;

    if (elapsedTime > 1000) {
      const wpm = calculateWPM(userInput, elapsedTime);
      const accuracy = calculateAccuracy(text.substring(0, userInput.length), userInput);

      setResults({
        wpm: wpm,
        accuracy: accuracy,
        time: elapsedTime / 1000
      });
    } else {
      // If test was too short, set default values
      setResults({ wpm: 0, accuracy: 0, time: elapsedTime / 1000 });
    }
  };

  const handleInputChange = (input) => {
    if (!startTime && input.length > 0) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    setUserInput(input);

    // Update real-time stats
    if (startTime && input.length > 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > 500) { // Only update stats after 0.5 seconds
        const wpm = calculateWPM(input, elapsedTime);
        const accuracy = calculateAccuracy(text.substring(0, input.length), input);

        setCurrentWPM(wpm);
        setCurrentAccuracy(accuracy);
      }
    }

    // Check if test is complete for words mode
    if (!endTime) {
      const textWords = text.split(' ');
      const inputWords = input.split(' ');

      // Check if all words are typed and the last word is complete
      if (inputWords.length >= textWords.length &&
        inputWords[textWords.length - 1] === textWords[textWords.length - 1]) {
        endTest();
      }
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareResult = (platform) => {
    if (!results) return;

    const shareText = `🎯 typyTest Results: ${results.wpm} WPM | ${results.accuracy}% Accuracy | ${results.time.toFixed(1)}s | Mode: ${mode}`;
    const url = window.location.href;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${url}`);
        alert('Results copied to clipboard!');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'typyTest Results',
            text: shareText,
            url: url
          });
        } else {
          navigator.clipboard.writeText(`${shareText}\n${url}`);
          alert('Results copied to clipboard!');
        }
    }

    setShowShareOptions(false);
  };

  return (
    <div className={`app ${theme}-theme`}>
      <div className="container">
        <Header toggleTheme={toggleTheme} theme={theme} onShare={handleShare} onNewTest={generateNewTest} />

        <Settings
          mode={mode}
          setMode={setMode}
          wordCount={wordCount}
          setWordCount={setWordCount}
          resetTest={resetTest}
        />

        <div className="stats-container">
          <Timer
            isActive={isActive}
            startTime={startTime}
            endTime={endTime}
            mode={mode}
          />

          {isActive && (
            <div className="live-stats">
              <div className="stat">
                <span className="value">{currentWPM}</span>
                <span className="label">WPM</span>
              </div>
              <div className="stat">
                <span className="value">{currentAccuracy}%</span>
                <span className="label">Accuracy</span>
              </div>
            </div>
          )}
        </div>

        <div className="typing-area" onClick={() => document.querySelector('input').focus()}>
          {isLoading ? (
            <div className="loading">Loading text...</div>
          ) : (
            <>
              <TextDisplay text={text} userInput={userInput} />
              <TypingInput
                value={userInput}
                onChange={handleInputChange}
                disabled={!!endTime}
              />
            </>
          )}
        </div>

        {!results && !isLoading && (
          <TestControls
            onRestart={resetTest}
            onNewTest={generateNewTest}
          />
        )}

        {results && (
          <Results
            results={results}
            resetTest={resetTest}
            onShare={handleShare}
            onNewTest={generateNewTest}
            mode={mode}
          />
        )}

        {showShareOptions && (
          <div className="share-overlay">
            <div className="share-modal">
              <h3>Share Your Results</h3>
              <div className="share-buttons">
                <button className="share-button twitter" onClick={() => shareResult('twitter')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.07 4.19 20.76 3.14 21.1 1.92C20.08 2.52 18.94 2.98 17.71 3.21C16.33 1.63 14.23 1.24 12.35 2.09C10.46 2.95 9.28 4.89 9.5 6.9C6.55 6.75 3.78 5.11 1.89 2.6C0.39 5.15 1.12 8.32 3.5 9.72C2.62 9.7 1.76 9.47 1 9.05C1 9.06 1 9.08 1 9.09C1 11.43 2.37 13.42 4.36 13.97C3.5 14.2 2.58 14.2 1.7 13.97C2.2 15.91 3.97 17.32 6.06 17.38C4.36 18.73 2.22 19.35 0 19.05C2.11 20.42 4.61 21.19 7.28 21.19C16.05 21.19 20.84 13.84 20.84 7.46C20.84 7.25 20.84 7.04 20.83 6.83C21.86 6.11 22.74 5.21 23.44 4.17L22 4.01Z" />
                  </svg>
                </button>

                <button className="share-button linkedin" onClick={() => shareResult('linkedin')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>

                <button className="share-button whatsapp" onClick={() => shareResult('whatsapp')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </button>

                <button className="share-button copy" onClick={() => shareResult('copy')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" />
                  </svg>
                </button>
              </div>
              <button className="close-button" onClick={() => setShowShareOptions(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
