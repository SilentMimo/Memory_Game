import PropTypes from 'prop-types';
import './CounterCard.css';

const STEP = 2;

const CounterCard = ({ cardsCount, onClick }) => {
    // Función para decrementar la cantidad de cartas
    const onDecrement = e => {
        e.preventDefault();
        const number = cardsCount - STEP;
        // Verificar si el número resultante es mayor o igual a 10 antes de actualizar
        if (number >= 10) onClick(number);
    };

    // Función para incrementar la cantidad de cartas
    const onIncrement = e => {
        e.preventDefault();
        const number = cardsCount + STEP;
        // Verificar si el número resultante es menor o igual a 40 antes de actualizar debido que el maximo de imagenes que entrega el endpoint es 20
        if (number <= 40) onClick(number);
    };

    return (
        <div className="quantity">
            <button className="minus d-flex align-items-center justify-content-center" onClick={onDecrement}>
                -
            </button>
            <span className="quantity">{cardsCount}</span>
            <button className="plus d-flex align-items-center justify-content-center" onClick={onIncrement}>
                +
            </button>
        </div>
    );
};

export default CounterCard;

CounterCard.propTypes = {
    cardsCount: PropTypes.number.isRequired, 
    onClick: PropTypes.func.isRequired, 
};
