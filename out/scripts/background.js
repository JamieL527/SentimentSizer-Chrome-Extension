/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var clipboardHistory = (/* unused pure expression or super */ null && ([]));

// Handle extension installation
chrome.runtime.onInstalled.addListener(function () {
  console.log('Extension installed');
  chrome.storage.sync.set({
    popupWidth: '400',
    popupHeight: '600'
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener(function () {
  console.log('Action icon clicked');
  chrome.storage.sync.get(['popupWidth', 'popupHeight'], function (result) {
    var width = result.popupWidth ? parseInt(result.popupWidth, 10) : 400;
    var height = result.popupHeight ? parseInt(result.popupHeight, 10) : 600;

    // Get screen width using chrome.system.display API
    chrome.system.display.getInfo(function (displays) {
      var _displays$;
      var screenWidth = (_displays$ = displays[0]) === null || _displays$ === void 0 || (_displays$ = _displays$.workArea) === null || _displays$ === void 0 ? void 0 : _displays$.width;
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Received message:', request);
  if (request.type === 'adjustPopupSize') {
    chrome.storage.sync.set({
      popupWidth: request.width,
      popupHeight: request.height
    });
  }
  sendResponse({
    status: 'OK'
  });
});
/******/ })()
;