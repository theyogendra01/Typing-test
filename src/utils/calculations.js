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
    if (!typedText || typedText.length === 0) return 100; // Return 100% when nothing is typed yet

    let correctChars = 0;
    const typedLength = typedText.length;

    // Only compare up to what has been typed
    for (let i = 0; i < typedLength; i++) {
        if (originalText[i] === typedText[i]) {
            correctChars++;
        }
    }

    return Math.round((correctChars / typedLength) * 100);
}
