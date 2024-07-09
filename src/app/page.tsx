"use client";

import React, { useState, useEffect } from 'react';

const Page: React.FC = () => {
  const [sites, setSites] = useState<string[]>([]);
  const [newSite, setNewSite] = useState<string>('');

  useEffect(() => {
    chrome.storage.sync.get(['quickAccessSites'], (result) => {
      if (!chrome.runtime.lastError) {
        setSites(result.quickAccessSites || []);
      } else {
        console.error(chrome.runtime.lastError);
      }
    });
  }, []);

  const addSite = () => {
    if (newSite.trim() !== '') {
      const updatedSites = [...sites, newSite.trim()];
      setSites(updatedSites);
      setNewSite('');
      chrome.storage.sync.set({ quickAccessSites: updatedSites });
    }
  };

  const removeSite = (index: number) => {
    const updatedSites = [...sites];
    updatedSites.splice(index, 1);
    setSites(updatedSites);
    chrome.storage.sync.set({ quickAccessSites: updatedSites });
  };

  const openSite = (url: string) => {
    chrome.tabs.create({ url });
  };

  return (
    <div>
      <header>
        <img src="./logo.png" alt="Logo" />
        <h1>My Favorite Websites</h1>
      </header>
      <main>
        <div className="main-container">
          <div className="card">
            <h2>Quick Access</h2>
            <ul>
              {sites.map((site, index) => (
                <li key={index}>
                  <span className="site-link" onClick={() => openSite(site)}>{site}</span>
                  <button className="remove-button" onClick={() => removeSite(index)}>−</button>
                </li>
              ))}
            </ul>
            <div className="input-container">
              <input
                type="text"
                value={newSite}
                onChange={(e) => setNewSite(e.target.value)}
                placeholder="Add a new site"
                className="input-field"
              />
              <button onClick={addSite} className="btn">Add Site</button>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <a href="settings.html" target="_blank">Settings</a>
        <a href="help.html" target="_blank" className="help">Help</a>
      </footer>
    </div>
  );
};

export default Page;
















