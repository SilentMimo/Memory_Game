import PropTypes from 'prop-types';

const Result = ({ restartGame,userName}) => {
  return (
    <div className="container frosted d-flex flex-column mb-5">
        <h2 className="d-flex justify-content-center mt-3">Felicidades {userName} ganaste!</h2>
        <button className="btn button btn-outline-secondary frosted" onClick={restartGame}>
          Finish Game
        </button>
    </div>
  )
}

export default Result;

Result.propTypes ={
  restartGame: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}
