import PropTypes from 'prop-types';
import './Card.css';
import Image from '../Image/Image';

  // Función para manejar el clic en una carta
const Card = ({ card, onCardClick }) => {
     // Verificar si la carta ya se mostró o se encontró
  const onClick = () => {
    if (card.isShown || card.isFound) return;
    onCardClick(card.uniqueId);
  };

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2 col-xxxl-1 mb-4 mx-2"> 
      <div className="container__card" onClick={onClick}>
        <div className={`${card.isShown ? '.flipped' : 'card__item'}`}>
          <div className={`${card.isFound ? 'found' : 'front'}`}></div>
          <div className="back">
            <Image url={card.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  card: PropTypes.shape({
    url: PropTypes.string.isRequired,
    uniqueId: PropTypes.number.isRequired,
    isShown: PropTypes.bool.isRequired,
    isFound: PropTypes.bool.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
};
