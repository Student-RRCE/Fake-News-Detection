// Content script runs on all web pages
// Listens for messages from popup or background script

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    // Extract main content from the page
    const content = extractPageContent();
    sendResponse({ content });
  }
  
  if (request.action === 'getSelectedText') {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
  
  return true; // Keep message channel open for async response
});

// Extract meaningful content from the page
function extractPageContent() {
  // Try to get article content
  const article = document.querySelector('article');
  if (article) {
    return article.innerText;
  }
  
  // Try common content selectors
  const contentSelectors = [
    'main',
    '[role="main"]',
    '.content',
    '.article-content',
    '.post-content',
    '#content'
  ];
  
  for (const selector of contentSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      return element.innerText;
    }
  }
  
  // Fallback to body text
  return document.body.innerText;
}

// Optional: Add visual indicator when extension is active
console.log('VerifyAI: Content script loaded');
