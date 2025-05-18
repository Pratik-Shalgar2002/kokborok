// Background script for Kokborok Translator extension

// Keep track of service worker initialization
console.log("Background service worker initializing");

// Listen for installation
chrome.runtime.onInstalled.addListener(function(details) {
  console.log("Kokborok Translator installed", details.reason);
  
  // Create context menu items
  try {
    chrome.contextMenus.create({
      id: "translateToKokborok",
      title: "Translate page to Kokborok",
      contexts: ["page"]
    });
    console.log("Context menu created");
  } catch (error) {
    console.error("Error creating context menu:", error);
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("Context menu clicked:", info.menuItemId);
  if (info.menuItemId === "translateToKokborok") {
    console.log("Sending translate message to tab:", tab.id);
    try {
      chrome.tabs.sendMessage(tab.id, { action: "translate" }, function(response) {
        // Handle response if needed
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
        } else {
          console.log("Translation message sent successfully");
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
});

// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Background received message:", request);
  if (request.action === "getStatus") {
    sendResponse({ status: "active" });
    return true;
  }
});

// Log when the service worker is ready
console.log("Background service worker initialized"); 