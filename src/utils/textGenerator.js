// src/utils/textGenerator.js

const MONKEY_TYPE_API = 'https://api.monkeytype.com/v1/words';

async function fetchRandomWords(count) {
  try {
    const response = await fetch(MONKEY_TYPE_API);
    const words = await response.json();
    return words.slice(0, count).join(' ');
  } catch (error) {
    console.error('Error fetching words:', error);
    return fallbackWords(count); // Use fallback if API fails
  }
}

// Calculate needed words based on time
function getWordsNeededForTime(seconds) {
  // Average person types ~200 CPM, so we need enough words for the time period
  const averageWPM = 40;
  const wordsNeeded = Math.ceil((averageWPM * seconds) / 60) * 2; // Double it to ensure enough words
  return wordsNeeded;
}

export async function generateText(count = 25, mode = 'words', timeLimit = 30) {
  if (mode === 'time') {
    count = getWordsNeededForTime(timeLimit);
  }
  return await fetchRandomWords(count);
}
