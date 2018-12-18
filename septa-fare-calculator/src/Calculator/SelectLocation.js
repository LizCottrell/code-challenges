var React = require('react');
var PropTypes = require('prop-types');

function SelectLocation(props) {
  return (
    <div className="calculator__formfield--wrapper">
      <fieldset className="calculator__formfield">
        <legend className="calculator__formfield--label">{props.text}</legend>
        <div className="radio">
          <label
            className={
              props.selectedTime === 'anytime'
                ? 'calculator__formfield--field disabled'
                : 'calculator__formfield--field'
            }
          >
            <input
              type="radio"
              name="selectedLocation"
              value="onboard_purchase"
              disabled={props.selectedTime === 'anytime'}
              checked={props.selectedLocation === 'onboard_purchase'}
              onChange={props.onSelect}
            />
            Onboard
          </label>
        </div>

        <div className="radio">
          <label className="calculator__formfield--field">
            <input
              type="radio"
              name="selectedLocation"
              value="advance_purchase"
              checked={props.selectedLocation === 'advance_purchase'}
              onChange={props.onSelect}
            />
            Kiosk
          </label>
        </div>
      </fieldset>
      {props.info.map(function(helperText, index) {
        if (props.selectedLocation === helperText[0])
          return (
            <p key={index} className="calculator__formfield--helper">
              {helperText[1]}
            </p>
          );
      })}
    </div>
  );
}

SelectLocation.propTypes = {
  text: PropTypes.string.isRequired,
  selectedLocation: PropTypes.string.isRequired,
  selectedTime: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  info: PropTypes.array.isRequired
};

module.exports = SelectLocation;
