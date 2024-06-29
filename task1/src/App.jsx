

import React, { useState, useEffect } from 'react';
import Wheel from './Wheel';
import './App.css';

const App = () => {
  const [names, setNames] = useState(["Alice", "Bob", "Charlie", "David", "Eve"]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const newNames = inputValue.split('\n').filter(name => name.trim() !== '');
    setNames(newNames);
  };

  useEffect(() => {
    const textarea = document.getElementById('name-input');
    textarea.value = names.join('\n');
  }, []);

  return (
    <div className="app">
      <div className="grid-container">
        <div className="wheel-container">
          <Wheel segments={names} />
        </div>
        <div className="input-container">
          <textarea
            id="name-input"
            placeholder="Enter names (one per line)"
            onChange={handleInputChange}
            defaultValue={names.join('\n')}
          />
        </div>
        <div className="controls">
          <button className="spin-button" onClick={() => document.getElementById('spin-btn').click()}>Spin</button>
          <div id="winner" className="winner-output"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
