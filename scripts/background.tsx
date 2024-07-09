let clipboardHistory: string[] = [];

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.storage.sync.set({ popupWidth: '400', popupHeight: '600' });
});

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  console.log('Action icon clicked');
  chrome.storage.sync.get(['popupWidth', 'popupHeight'], (result) => {
    const width = result.popupWidth ? parseInt(result.popupWidth, 10) : 400; 
    const height = result.popupHeight ? parseInt(result.popupHeight, 10) : 600; 

    // Get screen width using chrome.system.display API
    chrome.system.display.getInfo((displays) => {
      const screenWidth = displays[0]?.workArea?.width

      chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',  
        width: width,
        height: height,
        left: screenWidth - width, 
        top: 0
      });
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  if (request.type === 'adjustPopupSize') {
    chrome.storage.sync.set({
      popupWidth: request.width,
      popupHeight: request.height,
    });
  }
  sendResponse({ status: 'OK' });
});

















