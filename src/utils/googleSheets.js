/**
 * Google Sheets integration for score submission
 */

// Set your Google Apps Script URL here
const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDw_xaOsjLLMdDlzr-pzhpz5VfWhSEmNKEgrkczAIucnoCbccqQPIj0xBmJa_hx_V/exec';

/**
 * Sends score data to Google Sheets
 */
export async function submitScore(scoreData) {
  if (!GOOGLE_APP_SCRIPT_URL) {
    console.warn('GOOGLE_APP_SCRIPT_URL is not set. Skipping score submission.');
    return { success: false, message: 'Score submission is disabled' };
  }

  const data = {
    timestamp: new Date().toLocaleString(),
    ...scoreData
  };

  try {
    const response = await fetch(GOOGLE_APP_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return { success: true, message: 'Score submitted successfully!' };
  } catch (error) {
    console.error('Error submitting score:', error);
    return { success: false, message: 'Error submitting score. Please check your internet connection.' };
  }
}

