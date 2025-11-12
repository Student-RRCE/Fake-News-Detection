# VerifyAI Browser Extension

AI-powered fake news detection browser extension for Chrome and Firefox.

## Features

- 🔍 Analyze any webpage directly from your browser
- 📝 Analyze selected text on any page
- 🎯 Instant credibility scoring (0-100%)
- 📊 Detailed analysis with key indicators
- 🌐 Support for English, Kannada, Hindi, Tamil, and Telugu
- ⚡ Fast and lightweight

## Installation

### For Development/Testing

#### Chrome/Edge/Brave

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `browser-extension` folder
5. The extension icon should appear in your toolbar

#### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Navigate to the `browser-extension` folder
4. Select the `manifest.json` file
5. The extension will be loaded temporarily

### For Production

#### Chrome Web Store

1. Create a ZIP file of the `browser-extension` folder:
   ```bash
   cd browser-extension
   zip -r verifyai-extension.zip *
   ```

2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Pay the one-time $5 developer registration fee
4. Click "New Item" and upload the ZIP file
5. Fill in the required details (description, screenshots, etc.)
6. Submit for review

#### Firefox Add-ons

1. Create a ZIP file (same as above)
2. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Sign in with your Firefox account
4. Click "Submit a New Add-on"
5. Upload the ZIP file and follow the submission process

## Usage

### Analyze Current Page
1. Click the extension icon in your toolbar
2. Click "Analyze This Page"
3. Wait for the analysis results

### Analyze Selected Text
1. Select text on any webpage (minimum 50 characters)
2. Click the extension icon
3. Click "Analyze Selected Text"
4. View the credibility analysis

### View Full Report
- After analysis, click "View Full Report" to open the detailed report in the main VerifyAI website

## Icons

The extension requires icons in the following sizes:
- 16x16 pixels (toolbar icon)
- 48x48 pixels (extension management)
- 128x128 pixels (Chrome Web Store)

Place PNG icons in the `browser-extension/icons/` folder with these names:
- `icon16.png`
- `icon48.png`
- `icon128.png`

## Privacy

- The extension only analyzes content when you explicitly click the analyze buttons
- Content is sent to the VerifyAI API for analysis
- No data is stored or tracked
- Analysis requests are processed securely

## Permissions

The extension requires these permissions:
- `activeTab` - To access the current page URL and content
- `scripting` - To extract selected text from pages
- `<all_urls>` - To work on any website

## Support

For issues or questions:
- Report bugs via the feedback form on the website

## Development

To modify the extension:

1. Edit the source files in `browser-extension/`
2. Reload the extension in your browser:
   - Chrome: Go to `chrome://extensions/` and click the reload icon
   - Firefox: Go to `about:debugging` and click "Reload"
3. Test your changes

## API Configuration

The extension connects to:
```
https://doxhtnodikewsimcfepa.supabase.co/functions/v1/analyze-news
```

To change the API endpoint, edit `popup.js` and update the `API_URL` constant.

## License

© 2025 Fake News Detection System | Empowering awareness, one click at a time.
