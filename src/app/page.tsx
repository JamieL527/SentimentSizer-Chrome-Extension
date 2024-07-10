import React, { useState } from 'react';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const Page: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [analysis, setAnalysis] = useState<{ score: number, comparative: number, tokens: string[], words: string[] }>({
    score: 0,
    comparative: 0,
    tokens: [],
    words: []
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleAnalyzeSentiment = () => {
    const result = sentiment.analyze(text);
    setAnalysis(result);
  };

  return (
    <div>
      <header>
        <img src="./logo.png" alt="Logo" />
        <h1>Text Sentiment Analyzer</h1>
      </header>
      <main className="main-container" >
        <div className="header-content">
          <div className="input-group">
          <label style={{ marginRight: '20px' }}>
              Enter Text:
              <textarea
                className="input-field"
                value={text}
                onChange={handleInputChange}
                style={{ width: '100%', height: '150px', marginBottom: '10px' ,resize: 'none'}}
               />
            </label>
          </div>
          <button className="btn" onClick={handleAnalyzeSentiment}>
            Analyze Sentiment
          </button>
          <div className="result-container">
            <h2 className="label">Sentiment Analysis:</h2>
            <p className="label">Score:</p>
            <p>{analysis.score}</p>
            <p className="label">Comparative:</p>
            <p>{analysis.comparative}</p>
            <p className="label">Tokens:</p>
            <p>{analysis.tokens.join(', ')}</p>
            <p className="label">Words:</p>
            <p>{analysis.words.join(', ')}</p>
          
            <p className="paragraph-with-margin">
              <em>
                Score indicates the overall sentiment score (higher means more positive).
                Comparative shows the relative positivity. Tokens and Words list key 
                terms with emotional weight or importance.
              </em>
            </p>
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
















































