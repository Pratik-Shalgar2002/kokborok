document.addEventListener('DOMContentLoaded', function() {
  console.log('Popup loaded');
  
  // Status element for feedback
  const statusEl = document.getElementById('statusMessage');
  
  // Function to inject the content script if needed
  function ensureContentScriptInjected(tab, callback) {
    // Check if content script is already running by sending a test message
    try {
      chrome.tabs.sendMessage(tab.id, { action: 'ping' }, function(response) {
        if (chrome.runtime.lastError) {
          console.log('Content script not yet loaded, injecting now');
          // Inject the content script
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          }, function(results) {
            if (chrome.runtime.lastError) {
              console.error('Failed to inject content script:', chrome.runtime.lastError);
              statusEl.textContent = 'Error: Could not inject script. Try refreshing the page.';
              callback(false);
              return;
            }
            
            console.log('Content script injected successfully');
            callback(true);
          });
        } else {
          console.log('Content script already running');
          callback(true);
        }
      });
    } catch (err) {
      console.error('Error in ensureContentScriptInjected:', err);
      statusEl.textContent = 'Error: ' + err.message;
      callback(false);
    }
  }
  
  // Translate button click handler
  document.getElementById('translatePage').addEventListener('click', function() {
    statusEl.textContent = 'Working...';
    
    // Get the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (chrome.runtime.lastError) {
        console.error('Error querying tabs:', chrome.runtime.lastError);
        statusEl.textContent = 'Error: ' + chrome.runtime.lastError.message;
        return;
      }
      
      if (!tabs || tabs.length === 0) {
        statusEl.textContent = 'Error: No active tab found';
        return;
      }
      
      const activeTab = tabs[0];
      
      // Check if we can access the tab (some pages like chrome:// are restricted)
      if (!activeTab.url || activeTab.url.startsWith('chrome://') || activeTab.url.startsWith('chrome-extension://')) {
        statusEl.textContent = 'Error: Cannot access this page due to Chrome restrictions';
        return;
      }
      
      // Ensure content script is loaded
      ensureContentScriptInjected(activeTab, function(success) {
        if (!success) return;
        
        // Send translate message
        chrome.tabs.sendMessage(activeTab.id, { action: 'translate' }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            statusEl.textContent = 'Error: Could not connect to page. Try reloading.';
            return;
          }
          
          // Update status message
          statusEl.textContent = 'Translating...';
          setTimeout(() => {
            statusEl.textContent = 'Translation complete!';
          }, 1000);
        });
      });
    });
  });

  // Restore button click handler
  document.getElementById('restorePage').addEventListener('click', function() {
    statusEl.textContent = 'Working...';
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (chrome.runtime.lastError) {
        console.error('Error querying tabs:', chrome.runtime.lastError);
        statusEl.textContent = 'Error: ' + chrome.runtime.lastError.message;
        return;
      }
      
      if (!tabs || tabs.length === 0) {
        statusEl.textContent = 'Error: No active tab found';
        return;
      }
      
      const activeTab = tabs[0];
      
      // Check if we can access the tab
      if (!activeTab.url || activeTab.url.startsWith('chrome://') || activeTab.url.startsWith('chrome-extension://')) {
        statusEl.textContent = 'Error: Cannot access this page due to Chrome restrictions';
        return;
      }
      
      // Ensure content script is loaded
      ensureContentScriptInjected(activeTab, function(success) {
        if (!success) return;
        
        // Send restore message
        chrome.tabs.sendMessage(activeTab.id, { action: 'restore' }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            statusEl.textContent = 'Error: Could not connect to page. Try reloading.';
            return;
          }
          
          // Update status message
          statusEl.textContent = 'Restoring original content...';
          setTimeout(() => {
            statusEl.textContent = 'Original content restored!';
          }, 1000);
        });
      });
    });
  });
}); 