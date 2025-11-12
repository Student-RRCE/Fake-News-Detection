// Background service worker
// Handles extension lifecycle and cross-tab communication

chrome.runtime.onInstalled.addListener(() => {
  console.log('VerifyAI extension installed');
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze') {
    // Forward analysis request if needed
    handleAnalysis(request.data)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

// Handle analysis requests
async function handleAnalysis(data) {
  const API_URL = 'https://doxhtnodikewsimcfepa.supabase.co/functions/v1/analyze-news';
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }
  
  return await response.json();
}

// Optional: Add context menu item for quick analysis
chrome.contextMenus.create({
  id: 'analyze-selection',
  title: 'Analyze with VerifyAI',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyze-selection') {
    // Open popup or handle analysis
    chrome.action.openPopup();
  }
});
