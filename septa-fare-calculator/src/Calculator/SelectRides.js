var React = require('react');
var PropTypes = require('prop-types');

function SelectRides(props) {
  return (
    <div className="calculator__formfield--wrapper">
      <label className="calculator__formfield">
        <span className="calculator__formfield--label">{props.text}</span>
        <input
          type="number"
          min={props.selectedTime === 'anytime' ? '10' : '1'}
          max="100"
          step={props.selectedTime === 'anytime' ? '10' : '1'}
          name="selectedRides"
          className="form-control calculator__formfield--field"
          value={props.selectedRides}
          onChange={props.onSelect}
        />
      </label>
      {props.selectedTime === 'anytime' && (
        <p className="calculator__formfield--helper">
          <strong>Anytime Tickets</strong> are only available as 10-Trip strips.
          Advance purchase required.
        </p>
      )}
    </div>
  );
}

SelectRides.propTypes = {
  text: PropTypes.string.isRequired,
  selectedTime: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

module.exports = SelectRides;
