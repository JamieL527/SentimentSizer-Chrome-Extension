"use client";

import React from 'react';


const HelpPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="header">
        <img src="./logo.png" alt="Logo" />
        <h1>Help</h1>
      </header>
      <main className="main">
        <div className="main-container">
          <div className="card">
            <p>Help content here...</p>
          </div>
        </div>
      </main>
    </div>
  );
};


export default HelpPage;



