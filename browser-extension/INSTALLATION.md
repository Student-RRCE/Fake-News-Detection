# VerifyAI Extension - Installation Guide

## Quick Start

### 1. Prepare Icons (IMPORTANT)

The extension icons need to be created. You have two options:

**Option A: Use an online tool**
1. Go to https://www.iloveimg.com/resize-image
2. Upload `icon-original.png` from the `icons/` folder
3. Resize to 128x128px → Save as `icon128.png`
4. Resize to 48x48px → Save as `icon48.png`
5. Resize to 16x16px → Save as `icon16.png`

**Option B: Use ImageMagick (if installed)**
```bash
cd browser-extension/icons
convert icon-original.png -resize 128x128 icon128.png
convert icon-original.png -resize 48x48 icon48.png
convert icon-original.png -resize 16x16 icon16.png
```

### 2. Install in Chrome/Edge/Brave

1. Open your browser and go to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`

2. Enable **Developer mode** (toggle in the top-right corner)

3. Click **"Load unpacked"**

4. Select the `browser-extension` folder from your project

5. Done! The VerifyAI icon should now appear in your toolbar

### 3. Install in Firefox

1. Open Firefox and go to: `about:debugging#/runtime/this-firefox`

2. Click **"Load Temporary Add-on"**

3. Navigate to the `browser-extension` folder

4. Select the `manifest.json` file

5. Done! (Note: This is temporary and will be removed when you restart Firefox)

## Using the Extension

### Analyze Any Webpage
1. Visit any news article or webpage
2. Click the VerifyAI extension icon in your toolbar
3. Click **"Analyze This Page"**
4. View the credibility analysis instantly

### Analyze Selected Text
1. Select any text on a webpage (minimum 50 characters)
2. Click the VerifyAI extension icon
3. Click **"Analyze Selected Text"**
4. Get instant credibility results

### Features
- ✅ Real-time credibility scoring (0-100%)
- ✅ Detailed analysis with key indicators
- ✅ Support for English, Kannada, Hindi, Tamil, and Telugu
- ✅ Works on ANY website
- ✅ Privacy-focused (only analyzes when you click)

## Troubleshooting

### Icons not showing?
Make sure you've created all three icon files (16px, 48px, 128px) in the `icons/` folder.

### Extension not loading?
1. Check that you selected the correct `browser-extension` folder
2. Make sure the `manifest.json` file is in the folder
3. Check the browser console for errors

### Analysis not working?
1. Make sure you have an active internet connection
2. Try reloading the extension

### "Invalid manifest" error?
Make sure you're using Chrome/Edge version 88+ or Firefox 109+ (Manifest V3 support required)

## Publishing to Stores (Optional)

### Chrome Web Store
1. Create a ZIP file of the extension
2. Pay $5 one-time developer fee at [Chrome Web Store](https://chrome.google.com/webstore/devconsole)
3. Upload and submit for review

### Firefox Add-ons
1. Create a ZIP file
2. Submit at [Firefox Add-ons](https://addons.mozilla.org/developers/)
3. Free submission


