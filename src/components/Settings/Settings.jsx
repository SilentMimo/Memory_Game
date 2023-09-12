import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./Settings.css";
import CounterCard from "../CounterCard";
import { INITIAL_CARDS_COUNT } from "../../constants";

const Settings = ({ startGame }) => {
  const [name, setName] = useState(localStorage.getItem("playerName") || ''); // Obtener el nombre del jugador desde el almacenamiento local
  const [errorMessage, setErrorMessage] = useState('');
  const [cardsCount, setCardsCount] = useState(INITIAL_CARDS_COUNT);

 // Manejar cambios en el input del nombre de usuario
  const handleNameChange = (event) => {
    const inputText = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(inputText)) {
      setName(inputText);
      setErrorMessage('');
    } else {
      setErrorMessage('Por favor, ingrese solo letras y espacios.');
    }
  };

 // Iniciar el juego cuando se hace clic en el botón "Ingresar"
  const onStartGame = () => {
    if (!errorMessage) {
      if (name.trim() === "") {
        setErrorMessage('El nombre de usuario no puede estar en blanco.');
      } else {
         // Guardar el nombre del jugador en el almacenamiento local para asi hacerlo permanecer incluso si se recarga el browser
        localStorage.setItem("playerName", name);
        // Iniciar el juego con el nombre del jugador y la cantidad de cartas seleccionada
        startGame(name, cardsCount);
      }
    }
  };
  
// Cargar el nombre del jugador desde el almacenamiento local al cargar el componente
  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) {
      setName(storedName);
    }
  }, []); 

  return (
    <div className="d-flex justify-content-center pt-5">
      <div className="card frosted border-secondary frosted mb-3">
        <div className="card-header">
          <h2>¡Bienvenido a Memorize!</h2>
        </div>
        <div className="card-body text-secondary d-flex justify-content-center flex-column">
          <input type="text" className="form-control frosted" placeholder="Nombre de jugador" aria-label="Username" onChange={handleNameChange} value={name} required />
          {errorMessage && (
            <div className="text-danger">{errorMessage}</div>
          )}
          <h4 className="d-flex justify-content-center mb-2 mt-3">Numero de cartas</h4>
          <div className="setting">
            <CounterCard cardsCount={cardsCount} onClick={setCardsCount} />
          </div>
          
          <button type="button" className="btn btn-outline-secondary frosted mt-4" onClick={onStartGame} disabled={errorMessage !== ''}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

Settings.propTypes = {
  startGame: PropTypes.func.isRequired,
}
