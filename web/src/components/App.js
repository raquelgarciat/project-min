import '../styles/App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [playResultMsg, setPlayResultMsg] = useState('');
  const [resultIng, setResultIng] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/randoming')
      .then((response) => response.json())
      .then((data) => setResultIng(data));
  }, []);

  const handleClickPlay = (event) => {
    const clickedDiv = event.currentTarget.innerText;
    if (resultIng.length > 0) {
      if (clickedDiv === 'pan') {
        setPlayResultMsg('You win!');
      } else {
        setPlayResultMsg('You lose...');
      }
    }
  };

  return (
    <div className='container'>
      <header className='header'>
        <h3>Título del juego</h3>
        <h5>Subtítulo del juego</h5>
      </header>
      <main className='main'>
        <div className='cardlist'>Mazo de cartas</div>
        {resultIng.length > 0 && (
          <div onClick={handleClickPlay}>{resultIng[0].nameIng}</div>
        )}
        {resultIng.length > 0 && (
          <div onClick={handleClickPlay}>{resultIng[1].nameIng}</div>
        )}
        {resultIng.length > 0 && (
          <div onClick={handleClickPlay}>{resultIng[2].nameIng}</div>
        )}
        <div>{playResultMsg}</div>
      </main>
      <footer>
        Copyrighted and shit 2023 Quel - All rights copyrighted and righted.
      </footer>
    </div>
  );
}

export default App;
