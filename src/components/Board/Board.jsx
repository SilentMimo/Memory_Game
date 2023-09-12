import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./Board.css";
import useGetImages from './../../hooks/useGetImages';
import useGameLogic from './../../hooks/useGameLogic';
import Loader from './../Loader';
import Card from '../Card';
import Result from '../Result';

const Board = ({ userName, cardsCount, scoreCounter, restartGame }) => {
  // Obtener las imágenes necesarias para el juego
  const { images } = useGetImages({ cardsCount });
  const [isLoading, setIsLoading] = useState(true); 
  const { cards, onCardClick, isGameWon, matchedPairs, failedAttempts } = useGameLogic(images);
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    // Verificar si las imágenes se han cargado
    if (images.length > 0) {
      setIsLoading(false);
    }
  }, [images]);

  useEffect(() => {
    // Verificar si el juego se ha ganado
    if (isGameWon) {
      setShowResult(true); 
    }
  }, [isGameWon]);

  return (
    <div>
      {isGameWon && <Result restartGame={restartGame} userName={userName}/>}
      {isLoading ? (
        // Mostrar un indicador de carga si las imágenes aún se están cargando
        <Loader />
      ) : (
        // Mostrar el tablero del juego y la información del usuario
        <div >
          <div className="d-flex justify-content-center align-item-center frosted mb-5">
            <p className="mx-3 mb-0 py-2">Nombre de usuario: {userName}</p>
            <p className="mx-3 mb-0 py-2">Parejas Encontradas: {matchedPairs}</p>
            <p className="mx-3 mb-0 py-2">Intentos Fallidos: {failedAttempts}</p>
          </div>
          <div className=" board">
            {/* Mapear y renderizar las cartas en el tablero */}
            {cards.map(card => <Card key={card.uniqueId} card={card} onCardClick={onCardClick} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;

Board.propTypes = {
  userName: PropTypes.string.isRequired, 
  cardsCount: PropTypes.number.isRequired, 
  restartGame: PropTypes.func.isRequired, 
};
