var React = require('react');
var PropTypes = require('prop-types');

function Select(props) {
  return (
    <div className="calculator__formfield--wrapper">
      <label className="calculator__formfield">
        <span className="calculator__formfield--label">{props.text}</span>
        <select
          className="form-control calculator__formfield--field"
          name="selectedZone"
          value={props.selectedZone}
          onChange={props.onSelect}
        >
          {props.zones.map(function(zone, index) {
            return (
              <option key={index} value={zone.zone}>
                {zone.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

Select.propTypes = {
  selectedZone: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  zones: PropTypes.array.isRequired
};

module.exports = Select;
