import { useState } from 'react';
import './App.css';
import GameGrid from './components/GameGrid'
import Keyboard from './components/Keyboard'

function App() {
  const [keys, simulateKey] = useState([]);

  return (
    <>
    <h1 style={
      {color: 'white', fontSize: '2.5rem', 
        width: 'fit-content', marginLeft: 'auto', marginRight: 'auto',
      padding: '5px', marginBottom: '5px'}
    }>
      WORDLE în <span style={{color: '#002B7F'}}>RO</span><span style={{color: '#FCD116'}}>MÂ</span><span style={{color: '#CE1126'}}>NĂ</span>
    </h1>
    <GameGrid keys={keys} simulateKey={simulateKey} />
    <Keyboard simulateKey={simulateKey} />
    </>
  );
}

export default App;
