import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScheduleContainer from './components/ScheduleContainer.js';

function App() {
  return (
    <div className="App">
      <ScheduleContainer data={[{'name': 'пиродоксин', 'starts': '2020-07-01 12:00:00', 'ends': '2020-07-01 14:00:00'}]}/>
    </div>
  );
}

export default App;
