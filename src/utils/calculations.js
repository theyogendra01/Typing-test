// src/utils/calculations.js
export function calculateWPM(text, timeInMs) {
    if (!text || timeInMs < 100) return 0;

    // Count all characters (including spaces)
    const charCount = text.length;
    // Standard: 5 characters = 1 word
    const wordCount = charCount / 5;
    const minutes = timeInMs / 60000; // Convert ms to minutes

    return Math.round(wordCount / minutes);
}

export function calculateAccuracy(originalText, typedText) {
    if (!typedText || typedText.length === 0) return 0;

    let correctChars = 0;
    const totalChars = Math.min(typedText.length, originalText.length);

    for (let i = 0; i < totalChars; i++) {
        if (originalText[i] === typedText[i]) {
            correctChars++;
        }
    }

    return Math.round((correctChars / totalChars) * 100);
}
