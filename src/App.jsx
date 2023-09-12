import { useState } from 'react';
import Board from './components/Board';
import Settings from './components/Settings';



function App() {
    const [userName, setUserName] = useState(null); 
    const [cardsCount, setCardsCount] = useState(null); 



    const startGame = (name, count) => {
        setUserName(name); 
        setCardsCount(count);
    }

    const restartGame = () =>{
      setCardsCount(null); // Al resetear cardsCount a null basicamente fuerzo un "reseteo" del juego ya que la logica esta hecha para siempre tener un cardsCount
    }

    return (
        <>

            <h1 className="my-5">Memory Game</h1>
            
            {/* Condición para mostrar Settings o Board */}
            {userName === null || cardsCount === null ? (
              <Settings startGame={startGame} />
            ) : (
              <Board userName={userName} cardsCount={cardsCount} restartGame={restartGame} />
            )}
        </>
    );
}

export default App;
