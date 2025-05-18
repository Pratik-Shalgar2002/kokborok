# Kokborok Translator Chrome Extension

A Chrome extension that helps translate web content to Kokborok and other languages.

## Features

- Translate web pages to Kokborok language
- Also supports Hindi and Bengali translations
- Easy to use popup interface
- Ability to restore original page content

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" at the top right
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now be installed and visible in your toolbar

## Usage

1. Click on the extension icon in your Chrome toolbar
2. Select the target language (Kokborok, Hindi, or Bengali)
3. Click "Translate This Page" to translate the current page
4. Click "Restore Original" to revert back to the original page content

## Dictionary

The extension currently uses a basic dictionary of common words and phrases. For more extensive translation, the dictionary can be expanded in the `content.js` file.

## Customization

You can customize the extension by:
- Adding more words to the dictionaries in `content.js`
- Adding more languages by creating new dictionaries
- Modifying the UI in `popup.html`

## Note

This is a simple translation extension and may not provide perfect translations. It works best for basic content with common words and phrases.

## License

MIT 