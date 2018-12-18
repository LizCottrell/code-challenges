var React = require('react');
var PropTypes = require('prop-types');

function SelectTime(props) {
  return (
    <div className="calculator__formfield--wrapper">
      <label className="calculator__formfield">
        <span className="calculator__formfield--label">{props.text}</span>
        <select
          className="form-control calculator__formfield--field"
          name="selectedTime"
          value={props.selectedTime}
          onChange={props.onSelect}
        >
          <option value="weekday">Weekdays</option>
          <option value="evening_weekend">Evenings/Weekends</option>
          <option value="anytime">Anytime</option>
        </select>
      </label>
      {props.info.map(function(helperText, index) {
        if (props.selectedTime === helperText[0])
          return (
            <p key={index} className="calculator__formfield--helper">
              {helperText[1]}
            </p>
          );
      })}
    </div>
  );
}

SelectTime.propTypes = {
  text: PropTypes.string.isRequired,
  selectedTime: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  info: PropTypes.array.isRequired
};

module.exports = SelectTime;
