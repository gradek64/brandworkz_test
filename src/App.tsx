import React, { useState } from 'react';
import './App.css';

import SingleLocation from './components/SingleLocation'
import MultipleLocations from './components/MultipleLocations'

function App() {

  const views = ['single', 'multiple']
  const [view, setView] = useState(views[0])

  return (
    <div className="App">
      <p className='Buttons'>
        <button onClick={() => { setView(views[0]) }}>Current Weather</button>/
        <button onClick={() => { setView(views[1]) }}>16-day Weather</button>
      </p>
      {view === 'single' ? <SingleLocation /> : <MultipleLocations />}
    </div>
  );
}

export default App;
