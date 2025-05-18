// Store original page content
let originalContent = {};

// Add a console log to verify the script is loaded
console.log("Kokborok Translator content script loaded");

// Additional common English words to improve translation coverage
const additionalWords = {
  // Common prepositions
  "with": "সং", // swng
  "for": "ন", // no
  "in": "ঔ", // o
  "on": "তেই", // tei
  "at": "ঔ", // o
  "by": "বাই", // bai
  "from": "নি", // ni
  "to": "ন", // no
  "of": "নি", // ni
  "about": "বাহাই", // bahai
  
  // Common conjunctions
  "and": "আর", // aro
  "or": "বাহ", // bah
  "but": "কিন্তু", // kintu
  
  // Common pronouns
  "i": "আং", // ang
  "you": "নং", // nwng
  "he": "ব", // bo
  "she": "ব", // bo
  "it": "ইহা", // iha
  "we": "বরই", // bwrwi
  "they": "বরই", // bwrwi
  "me": "আং", // ang
  "him": "বিনি", // bini
  "her": "বিনি", // bini
  "us": "বরই", // bwrwi
  "them": "বরই", // bwrwi
  "my": "আনি", // ani
  "your": "নিনি", // nini
  
  // Common verbs
  "is": "আছে", // ache
  "are": "আছে", // ache
  "was": "আছিল", // achil
  "were": "আছিল", // achil
  "be": "হই", // hoi
  
  // Common business terms
  "business": "ব্যবসা", // bebosa
  "company": "কোম্পানি", // kompani
  "services": "কামনি", // kamni
  "solutions": "সমাধান", // somadhan
  "client": "ক্লায়েন্ট", // klayent
  "customer": "গ্রাহক", // grahok
  "project": "প্রকল্প", // prokolpo
  "partners": "অংশীদার", // ongshidar
  "engagement": "যোগাযোগ", // jogajog
  "technology": "প্রযুক্তি", // projukti
  
  // Year-related terms
  "year": "বচ্ছর", // bochhor
  "years": "বচ্ছর", // bochhor
  "since": "থেকে", // theke
  
  // Additional useful terms
  "our": "বরইনি", // bwrwini
  "their": "বরইনি", // bwrwini
  "this": "বি", // bi
  "that": "ঔ", // o
  "these": "বরই", // bwrwi
  "those": "বরই", // bwrwi
  "where": "বহা", // bwha
  "find": "খুঁজি", // khuji
  "connect": "সংযোগ", // songojog
  "click": "নখলাগ", // nwkhlag
  "need": "প্রয়োজন", // proyojon
  "best": "সেরা", // sera
  "growth": "বৃদ্ধি", // briddhi
  "globally": "বিশ্বব্যাপী" // bishobebapi
};

// Comprehensive dictionary for Kokborok translations with Bengali script
const kokborokDictionary = {
  // Common English words to Kokborok translations (with Bengali script)
  "hello": "হামজকমা", // hamjakma
  "welcome": "ফাগ্বি স্লামদ", // phagwi slamdo
  "thank you": "সুবাই", // subai
  "yes": "হই", // hoi
  "no": "দা", // da
  "good": "হামজকমা", // hamjakma
  "bad": "হাম্যা", // hamya
  "please": "দায়াখা", // dayakha
  "sorry": "খ্যাপসা", // khyapsa
  "food": "হাচুক", // hachuk
  "water": "চি", // chi
  "home": "নক", // nok
  "people": "মানুই", // manui
  "search": "রিবা", // riba
  "menu": "হাচুক বিজাপ", // hachuk bijap
  "login": "খাবন", // khabono
  "signup": "রেজিস্টার খা", // register kha
  "about": "বাহাই", // bahai
  "contact": "ফাগাত", // phagat
  "services": "কামনি", // kamni
  "products": "বথাই", // bothai
  "shop": "দুকান", // dukan
  "cart": "কার্ট", // kart
  "checkout": "বফ্রত", // bophrot
  
  // Additional common words
  "page": "বাহাই", // bahai
  "and": "আর", // aro
  "or": "বাহ", // bah
  "the": "",
  "a": "",
  "in": "ঔ", // o
  "on": "তেই", // tei
  "with": "সং", // swng
  "from": "নি", // ni
  "to": "ন", // no
  "by": "বাই", // bai
  "at": "ঔ", // o
  "for": "ন", // no
  "of": "নি", // ni
  "me": "আং", // ang
  "my": "আনি", // ani
  "you": "নং", // nwng
  "your": "নিনি", // nini
  "we": "বরই", // bwrwi
  "us": "বরই", // bwrwi
  "our": "বরইনি", // bwrwini
  "they": "বরই", // bwrwi
  "them": "বরই", // bwrwi
  "their": "বরইনি", // bwrwini
  "he": "ব", // bo
  "she": "ব", // bo
  "his": "বিনি", // bini
  "her": "বিনি", // bini
  "this": "বি", // bi
  "that": "ঔ", // o
  "these": "বরই", // bwrwi
  "those": "বরই", // bwrwi
  "who": "সই", // swi
  "what": "মুং", // mung
  "when": "বসক", // bwswk
  "why": "মানি", // mani
  "how": "বসক", // bwswk
  
  // Web elements
  "button": "বতম", // bwtwm
  "link": "লিঙ্ক", // link
  "image": "মুইবি", // muiwi
  "video": "ভিডিও", // video
  "audio": "অডিও", // audio
  "file": "ফাইল", // file
  "text": "ওয়াংমাই", // wangmai
  "document": "বিজাপ", // bijap
  "download": "ফাইদি", // phaidi
  "upload": "ফাই", // phai
  "share": "হামব্রাই", // hambrai
  "send": "থিনাং", // thinang
  "receive": "ফাইদি", // phaidi
  "message": "কথমা", // kothoma
  "notification": "কথমা", // kothoma
  "alert": "খনা", // khwna
  "warning": "খনা", // khwna
  "error": "ভুল", // bhul
  "success": "হামজকমা", // hamjakma
  "help": "গতলাই", // gotlai
  "support": "গতলাই", // gotlai
  "feedback": "কহরম", // kohorom
  
  // Navigation
  "home": "নক", // nok
  "back": "ফিয়া", // phiya
  "forward": "মুখাং", // mukhang
  "next": "মুখাং", // mukhang
  "previous": "সকনা", // swkna
  "top": "চুক্তেই", // chuktei
  "bottom": "খুক্তেই", // khuktei
  "up": "চেই", // chei
  "down": "খেই", // khei
  "left": "জাবাহ", // jabah
  "right": "চুকবাহ", // chukbah
  "menu": "হাচুক বিজাপ", // hachuk bijap
  "navigation": "তাংবাই", // tangbai
  "sitemap": "নক ওয়াংমাই", // nok wangmai
  
  // Actions
  "tap": "নখলাগ", // nwkhlag
  "swipe": "সরাই", // swrai
  "drag": "তাইন", // tain
  "drop": "থই", // thwi
  "scroll": "থই", // thwi
  "zoom": "চু", // chu
  "rotate": "ফুরুল", // phurul
  "edit": "সিলাইমি", // silaimi
  "delete": "ফাং", // phang
  "remove": "ফাং", // phang
  "add": "নাংতই", // nangtwi
  "create": "তাই", // tai
  "update": "সিলাইমি", // silaimi
  "save": "রক", // rok
  "cancel": "ফাই", // phai
  "submit": "থিনাং", // thinang
  "apply": "তাই", // tai
  "reset": "বতেই", // botei
  "refresh": "বতেই", // botei
  "reload": "বতেই", // botei
  
  // Time
  "time": "সাম", // samo
  "date": "থাংনি", // thangni
  "day": "সাল", // sal
  "week": "থাংদি", // thangdi
  "month": "থা", // tha
  "today": "তিনি", // tini
  "tomorrow": "গাবান", // gaban
  "yesterday": "মিনিত", // minit
  "now": "তাইখা", // taikha
  "later": "পাচে", // pache
  "soon": "তুং", // tung
  
  // Common website sections
  "about us": "চনং বাহাই", // chwnwng bahai
  "contact us": "চনং ফাগাত", // chwnwng phagat
  "terms": "নিয়াম", // niam
  "privacy": "কক হরপ", // kok horop
  "faq": "সগ বিসিং", // sogo bising
  "blog": "ওয়াংমাই বিজাপ", // wangmai bijap
  "news": "রনাই", // rwnai
  "events": "হামাই", // hamai
  "careers": "কাম", // kam
  "jobs": "কাম", // kam
  "pricing": "দাম", // dam
  "features": "গুন", // gun
  "benefits": "গুন", // gun
  "testimonials": "মানুই কক", // manui kok
  "reviews": "মানুই কক", // manui kok
  "gallery": "মুইবি নক", // muiwi nok
  "portfolio": "কামনি মুইবি", // kamni muiwi
  
  // Shopping
  "buy": "পাইনাই", // painai
  "sell": "পাইনাই", // painai
  "price": "দাম", // dam
  "discount": "কাম দাম", // kam dam
  "sale": "পাইনাই", // painai
  "offer": "ফিকির", // phikir
  "coupon": "কাম দাম বিজাপ", // kam dam bijap
  "promo": "ফিকির", // phikir
  "deal": "ফিকির", // phikir
  "basket": "কার্ট", // kart
  "checkout": "বফ্রত", // bophrot
  "purchase": "পাইনাই", // painai
  "order": "হুকুম", // hukum
  "shipping": "থিনাংবাই", // thinangbai
  "delivery": "ফাইদিবাই", // phaidibai
  "payment": "দাম", // dam
  "wallet": "তাংকা রক", // tangka rok
  "credit": "তাংকা লাই", // tangka lai
  "debit": "তাংকা ফাই", // tangka phai
  "cash": "তাংকা", // tangka
  "tax": "কার", // kar
  "invoice": "দাম বিজাপ", // dam bijap
  "receipt": "দাম বিজাপ", // dam bijap
  
  // User account
  "account": "নিনি", // nini
  "profile": "নিনি", // nini
  "settings": "সিলাইমি", // silaimi
  "preferences": "চামুং", // chamung
  "password": "কক হরপ", // kok horop
  "username": "কক হরপ মুং", // kok horop mung
  "email": "ইমেইল", // email
  "phone": "ফোন", // phone
  "address": "থই নক", // thwi nok
  "sign in": "খাবন", // khabono
  "sign out": "ফাইন", // phaino
  "log in": "খাবন", // khabono
  "log out": "ফাইন", // phaino
  "register": "রেজিস্টার খা", // register kha
  "join": "রেজিস্টার খা", // register kha
  "subscribe": "রেজিস্টার খা", // register kha
  "unsubscribe": "ফাইন", // phaino
  
  // Social
  "like": "হামজকমা", // hamjakma
  "dislike": "হাম্যা", // hamya
  "follow": "ইয়াক", // yak
  "unfollow": "ইয়াক দা", // yak da
  "comment": "কক", // kok
  "reply": "কক ফিয়া", // kok phiya
  "post": "তাই", // tai
  "tweet": "তাই", // tai
  "message": "কথমা", // kothoma
  "chat": "কক", // kok
  "friend": "কইতর", // koitor
  "unfriend": "কইতর দা", // koitor da
  "block": "রক", // rok
  "report": "কহরম", // kohorom
  "share": "হামব্রাই" // hambrai
};

// Add these words to kokborokDictionary
for (const [key, value] of Object.entries(additionalWords)) {
  if (!kokborokDictionary[key]) {
    kokborokDictionary[key] = value;
  }
}

// Function to translate text using Kokborok dictionary with Bengali script
function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  
  // First, merge the additional words into the main dictionary
  for (const [key, value] of Object.entries(additionalWords)) {
    if (!kokborokDictionary[key]) {
      kokborokDictionary[key] = value;
    }
  }
  
  // Simple word-by-word translation with preservation of case and punctuation
  let translatedText = text;
  
  // Sort dictionary keys by length (longest first) to handle phrases before individual words
  const sortedKeys = Object.keys(kokborokDictionary).sort((a, b) => b.length - a.length);
  
  // Create a map of words to replace
  const replacements = [];
  
  // First check multi-word phrases
  for (const phrase of sortedKeys) {
    if (phrase.includes(" ")) { // Only process multi-word phrases
      const phraseRegex = new RegExp('\\b' + escapeRegExp(phrase) + '\\b', 'gi');
      let phraseMatch;
      
      while ((phraseMatch = phraseRegex.exec(translatedText)) !== null) {
        const originalPhrase = phraseMatch[0];
        const kokborokPhrase = kokborokDictionary[phrase.toLowerCase()];
        
        // Store the replacement info
        replacements.push({
          start: phraseMatch.index,
          end: phraseMatch.index + originalPhrase.length,
          original: originalPhrase,
          replacement: kokborokPhrase
        });
      }
    }
  }
  
  // Then check single words
  for (const word of sortedKeys) {
    if (!word.includes(" ")) { // Only process single words
      const wordRegex = new RegExp('\\b' + escapeRegExp(word) + '\\b', 'gi');
      let match;
      
      while ((match = wordRegex.exec(translatedText)) !== null) {
        const originalWord = match[0];
        const kokborokWord = kokborokDictionary[word.toLowerCase()];
        
        // Skip if no translation available
        if (!kokborokWord) continue;
        
        // Check if this position is already covered by a multi-word replacement
        let isOverlap = false;
        for (const r of replacements) {
          if (match.index >= r.start && match.index < r.end) {
            isOverlap = true;
            break;
          }
        }
        
        if (!isOverlap) {
          // Store the replacement info to apply later
          replacements.push({
            start: match.index,
            end: match.index + originalWord.length,
            original: originalWord,
            replacement: kokborokWord
          });
        }
      }
    }
  }
  
  // Sort replacements in reverse order (to avoid offset issues)
  replacements.sort((a, b) => b.start - a.start);
  
  // Apply replacements
  for (const r of replacements) {
    translatedText = 
      translatedText.substring(0, r.start) + 
      r.replacement + 
      translatedText.substring(r.end);
  }
  
  return translatedText;
}

// Helper function to escape special characters in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to translate all text nodes in the DOM
function translatePage() {
  console.log("Starting Kokborok translation");
  try {
    // First, create a map of all elements we've already processed
    const processedElements = new Map();
    
    // Select all text-containing elements - adding more element types for better coverage
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, div, label, input[type="submit"], input[type="button"], li, td, th, strong, em, b, i, small, caption, figcaption, blockquote, cite');
    
    let processedCount = 0;
    elements.forEach((element, index) => {
      // Skip elements with too many children (likely complex layout elements)
      if (element.children.length > 8) return;
      
      // Skip elements we've already processed
      if (processedElements.has(element)) return;
      processedElements.set(element, true);
      
      // Skip very small text (likely not meaningful content)
      if (element.textContent && element.textContent.trim().length < 2) return;
      
      // Skip hidden elements
      if (element.offsetParent === null) return;
      
      // Store original content if not already stored
      if (!originalContent[index]) {
        originalContent[index] = {
          element: element,
          text: element.textContent,
          placeholder: element.placeholder,
          value: element.value,
          title: element.title,
          alt: element.alt
        };
      }
      
      // Translate visible text content (only for elements with simple text)
      if (element.textContent && element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
        const originalText = element.textContent.trim();
        if (originalText.length > 0) {
          const translatedText = translateText(originalText);
          if (translatedText !== originalText) {
            element.textContent = translatedText;
            processedCount++;
          }
        }
      }
      
      // Process all direct text nodes of complex elements
      if (element.childNodes.length > 1) {
        element.childNodes.forEach(childNode => {
          if (childNode.nodeType === Node.TEXT_NODE && childNode.textContent.trim().length > 0) {
            const originalText = childNode.textContent;
            const translatedText = translateText(originalText);
            if (translatedText !== originalText) {
              childNode.textContent = translatedText;
              processedCount++;
            }
          }
        });
      }
      
      // Translate placeholder attributes
      if (element.placeholder) {
        const translatedPlaceholder = translateText(element.placeholder);
        if (translatedPlaceholder !== element.placeholder) {
          element.placeholder = translatedPlaceholder;
          processedCount++;
        }
      }
      
      // Translate value attributes for buttons
      if ((element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) || element.tagName === 'BUTTON') {
        if (element.value) {
          const translatedValue = translateText(element.value);
          if (translatedValue !== element.value) {
            element.value = translatedValue;
            processedCount++;
          }
        }
      }
      
      // Translate title attributes (tooltips)
      if (element.title) {
        const translatedTitle = translateText(element.title);
        if (translatedTitle !== element.title) {
          element.title = translatedTitle;
          processedCount++;
        }
      }
      
      // Translate alt text for images
      if (element.tagName === 'IMG' && element.alt) {
        const translatedAlt = translateText(element.alt);
        if (translatedAlt !== element.alt) {
          element.alt = translatedAlt;
          processedCount++;
        }
      }
    });
    
    // Add translation indicator to the page
    const indicator = document.createElement('div');
    indicator.id = 'kokborok-translator-indicator';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.right = '10px';
    indicator.style.background = 'rgba(66, 133, 244, 0.9)';
    indicator.style.color = 'white';
    indicator.style.padding = '8px 15px';
    indicator.style.borderRadius = '5px';
    indicator.style.fontSize = '14px';
    indicator.style.zIndex = '9999';
    indicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    indicator.style.fontFamily = 'Arial, sans-serif';
    indicator.innerHTML = '<span style="font-family: \'Noto Sans Bengali\', \'Vrinda\', Arial, sans-serif;">কোকবরক তেই</span> | Translated ' + processedCount + ' elements';
    
    // Only add if not already present
    if (!document.getElementById('kokborok-translator-indicator')) {
      document.body.appendChild(indicator);
    }
    
    console.log(`Kokborok translation complete. Translated ${processedCount} elements.`);
  } catch (error) {
    console.error("Error during translation:", error);
  }
}

// Function to restore original content
function restorePage() {
  console.log("Restoring original content");
  try {
    Object.values(originalContent).forEach(item => {
      if (item.text) {
        item.element.textContent = item.text;
      }
      if (item.placeholder) {
        item.element.placeholder = item.placeholder;
      }
      if (item.value) {
        item.element.value = item.value;
      }
      if (item.title) {
        item.element.title = item.title;
      }
      if (item.alt) {
        item.element.alt = item.alt;
      }
    });
    
    // Clear original content map
    originalContent = {};
    
    // Remove translation indicator if present
    const indicator = document.getElementById('kokborok-translator-indicator');
    if (indicator) {
      indicator.remove();
    }
    
    console.log("Original content restored");
  } catch (error) {
    console.error("Error during page restoration:", error);
  }
}

// Listen for messages from the popup or background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Message received:", request);
  
  try {
    if (request.action === 'ping') {
      // Respond to ping to confirm content script is loaded
      console.log("Ping received, sending pong");
      sendResponse({status: 'pong'});
    }
    else if (request.action === 'translate') {
      // Always translate to Kokborok regardless of the language parameter
      translatePage();
      sendResponse({status: 'success'});
    } 
    else if (request.action === 'restore') {
      restorePage();
      sendResponse({status: 'success'});
    }
  } catch (error) {
    console.error("Error handling message:", error);
    sendResponse({status: 'error', message: error.toString()});
  }
  
  return true; // Keep the messaging channel open for the async response
}); 