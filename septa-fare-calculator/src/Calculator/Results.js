var React = require('react');
var PropTypes = require('prop-types');

function Results(props) {
  return (
    <div className="calculator__formresult--wrapper">
      <p className="calculator__formresult" aria-live="polite">
        {props.text} <span>${props.fare}</span>
      </p>
    </div>
  );
}

Results.propTypes = {
  text: PropTypes.string.isRequired,
  fare: PropTypes.string.isRequired
};

module.exports = Results;
