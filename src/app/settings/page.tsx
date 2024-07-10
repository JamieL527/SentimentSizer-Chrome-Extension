"use client";

import React, { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['popupWidth', 'popupHeight'], (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        if (result.popupWidth) setWidth(result.popupWidth);
        if (result.popupHeight) setHeight(result.popupHeight);
      });
    }
  }, []);

  const saveSettings = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({
        popupWidth: width,
        popupHeight: height,
      }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          setMessage('Failed to save settings.');
          return;
        }
        setMessage('Settings saved successfully.');
        console.log('Settings saved');
        // Send message to background script to adjust popup size
        chrome.runtime.sendMessage({ type: "adjustPopupSize", width, height });
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="header">
        <img src="./logo.png" alt="Logo" />
        <h1>Settings</h1>
      </header>
      <main className="main flex justify-center items-center">
        <div className="main-container">
          <div className="card">
            <div className="input-group">
              <label className="block mb-2">Popup Width:</label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label className="block mb-2">Popup Height:</label>
              <input
               type="text"
               value={height}
               onChange={(e) => setHeight(e.target.value)}
               className="input-field"
              />
            </div>

            <button
              onClick={saveSettings}
              className="btn mt-4"
              style={{ margin: '0 auto', display: 'block' }}
            >
              Save
            </button>
            {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}

          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;















