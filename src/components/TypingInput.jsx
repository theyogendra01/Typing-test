import { useRef, useEffect } from 'react';
import styles from '../styles/TypingInput.module.css';

function TypingInput({ value, onChange, disabled }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    if (!disabled) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent tab from moving focus
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={styles.hiddenInput}
      disabled={disabled}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
    />
  );
}

export default TypingInput;
