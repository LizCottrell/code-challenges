var React = require('react');
var PropTypes = require('prop-types');
var apiUtils = require('../utils/apiUtils');
var faresJson = require('../data/fares');
var logo = require('../assets/logo.svg');

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      apiData: faresJson,
      fare: 'this much',
      selectedTime: 'weekday',
      selectedZone: '1',
      selectedLocation: 'onboard_purchase',
      selectedRides: '1'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      apiData,
      fare,
      selectedTime,
      selectedZone,
      selectedLocation,
      selectedRides
    } = this.state;

    let zones = apiData.zones;
    let info = Object.entries(apiData.info);
    // let purchaseLocation = ;
    let selectedZoneData = apiData.zones[0].fares;

    return (
      <div className="calculator__container">
        <div className="calculator">
          <header className="calculator__header">
            <img className="calculator__header--logo" src={logo} />
            <h2 className="calculator__header--title">Regional Rail Fares</h2>
          </header>
          <form className="calculator__form">
            <div className="calculator__formfield--wrapper">
              <label className="calculator__formfield">
                <span className="calculator__formfield--label">
                  Where are you going?
                </span>
                <select
                  className="form-control calculator__formfield--field"
                  name="selectedZone"
                  value={this.state.selectedZone}
                  onChange={this.handleInputChange}
                >
                  {zones.map(function(zone, index) {
                    return (
                      <option key={index} value={zone.zone}>
                        {zone.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="calculator__formfield--wrapper">
              <label className="calculator__formfield">
                <span className="calculator__formfield--label">
                  When are you riding?
                </span>
                <select
                  className="form-control calculator__formfield--field"
                  name="selectedTime"
                  value={this.state.selectedTime}
                  onChange={this.handleInputChange}
                >
                  <option value="weekday">Weekdays</option>
                  <option value="evening_weekend">Evenings/Weekends</option>
                  <option value="anytime">Anytime</option>
                </select>
              </label>
              {info.map(function(helperText, index) {
                if (selectedTime === helperText[0])
                  return (
                    <p key={index} className="calculator__formfield--helper">
                      {helperText[1]}
                    </p>
                  );
              })}
            </div>
            <div className="calculator__formfield--wrapper">
              <fieldset className="calculator__formfield">
                <legend className="calculator__formfield--label">
                  Where will you purchase the fare?
                </legend>
                <div className="radio">
                  <label className="calculator__formfield--field">
                    <input
                      type="radio"
                      name="selectedLocation"
                      value="onboard_purchase"
                      checked={
                        this.state.selectedLocation === 'onboard_purchase'
                      }
                      onChange={this.handleInputChange}
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
                      checked={
                        this.state.selectedLocation === 'advance_purchase'
                      }
                      onChange={this.handleInputChange}
                    />
                    Kiosk
                  </label>
                </div>
              </fieldset>
              {info.map(function(helperText, index) {
                if (selectedLocation === helperText[0])
                  return (
                    <p key={index} className="calculator__formfield--helper">
                      {helperText[1]}
                    </p>
                  );
              })}
            </div>

            <div className="calculator__formfield--wrapper">
              <label className="calculator__formfield">
                <span className="calculator__formfield--label">
                  How many rides will you need?
                </span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  name="selectedRides"
                  className="form-control calculator__formfield--field"
                  value={this.state.selectedRides}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          </form>
          <div className="calculator__formresult--wrapper">
            <p className="calculator__formresult">
              Your fare will cost <span>{fare}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Calculator;
