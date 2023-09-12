import PropTypes from 'prop-types';

const Image = ({url}) => {
  return (
    <div>
        <img src={url} alt="" width="200" height="200" />
    </div>
  )
}

export default Image;
Image.propTypes ={
    url: PropTypes.string.isRequired,
}