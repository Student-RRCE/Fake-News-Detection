// API Configuration
const API_URL = 'https://doxhtnodikewsimcfepa.supabase.co/functions/v1/analyze-news';

// UI Elements
const elements = {
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  errorMessage: document.getElementById('error-message'),
  results: document.getElementById('results'),
  start: document.getElementById('start'),
  analyzePage: document.getElementById('analyze-page'),
  analyzeSelection: document.getElementById('analyze-selection'),
  retryBtn: document.getElementById('retry-btn'),
  viewFull: document.getElementById('view-full'),
  scoreValue: document.getElementById('score-value'),
  scoreCircle: document.getElementById('score-circle'),
  verdict: document.getElementById('verdict'),
  analysisText: document.getElementById('analysis-text'),
  indicatorsList: document.getElementById('indicators-list')
};

// Show/Hide sections
function showSection(section) {
  ['loading', 'error', 'results', 'start'].forEach(s => {
    elements[s].classList.add('hidden');
  });
  elements[section].classList.remove('hidden');
}

// Analyze content
async function analyzeContent(url, text = null) {
  showSection('loading');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, text })
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }

    const result = await response.json();
    displayResults(result);
  } catch (error) {
    console.error('Analysis error:', error);
    elements.errorMessage.textContent = error.message || 'Failed to analyze content. Please try again.';
    showSection('error');
  }
}

// Display results
function displayResults(result) {
  const { credibilityScore, verdict, analysis, indicators } = result;

  // Animate score
  animateScore(credibilityScore);

  // Set verdict
  elements.verdict.textContent = verdict;
  elements.verdict.className = 'verdict';
  if (credibilityScore >= 70) {
    elements.verdict.classList.add('reliable');
  } else if (credibilityScore >= 40) {
    elements.verdict.classList.add('questionable');
  } else {
    elements.verdict.classList.add('unreliable');
  }

  // Set analysis text
  elements.analysisText.textContent = analysis;

  // Set indicators
  elements.indicatorsList.innerHTML = '';
  indicators.forEach(indicator => {
    const li = document.createElement('li');
    li.textContent = indicator;
    elements.indicatorsList.appendChild(li);
  });

  showSection('results');
}

// Animate credibility score
function animateScore(targetScore) {
  const circumference = 339.292;
  const color = targetScore >= 70 ? '#22c55e' : targetScore >= 40 ? '#f59e0b' : '#ef4444';
  
  elements.scoreCircle.style.stroke = color;
  
  let current = 0;
  const duration = 1500;
  const increment = targetScore / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetScore) {
      current = targetScore;
      clearInterval(timer);
    }
    
    elements.scoreValue.textContent = Math.round(current);
    const offset = circumference - (current / 100) * circumference;
    elements.scoreCircle.style.strokeDashoffset = offset;
  }, 16);
}

// Get current tab info
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// Get selected text from page
async function getSelectedText() {
  const tab = await getCurrentTab();
  
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString()
  });
  
  return results[0].result;
}

// Event Listeners
elements.analyzePage.addEventListener('click', async () => {
  const tab = await getCurrentTab();
  analyzeContent(tab.url);
});

elements.analyzeSelection.addEventListener('click', async () => {
  const selectedText = await getSelectedText();
  
  if (!selectedText || selectedText.trim().length < 50) {
    elements.errorMessage.textContent = 'Please select at least 50 characters of text to analyze.';
    showSection('error');
    return;
  }
  
  analyzeContent(null, selectedText);
});

elements.retryBtn.addEventListener('click', () => {
  showSection('start');
});

elements.viewFull.addEventListener('click', async () => {
  const tab = await getCurrentTab();

  chrome.tabs.create({ url });
});

// Initialize
showSection('start');
