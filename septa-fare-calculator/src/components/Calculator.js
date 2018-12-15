var React = require('react');
var PropTypes = require('prop-types');
var apiUtils = require('../utils/apiUtils');
var faresJson = require('../data/fares');
var logo = require('../assets/logo.svg');

let fetchZoneData = function(json) {
  console.log(json);
};

fetchZoneData(faresJson);

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      fare: '',
      selectedTime: 'weekday',
      selectedZone: '1',
      numberOfRides: '',
      purchaseKiosk: true,
      purchaseOnboard: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="calculator__container">
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
                className="calculator__formfield--field"
                name="selectedZone"
                value={this.state.selectedZone}
                onChange={this.handleInputChange}
              >
                <option value="1">Zone 1</option>
                <option value="2">Zone 2</option>
                <option value="3">Zone 3</option>
                <option value="4">Zone 4</option>
              </select>
            </label>
          </div>
          <div className="calculator__formfield--wrapper">
            <label className="calculator__formfield">
              <span className="calculator__formfield--label">
                When are you riding?
              </span>
              <select
                className="calculator__formfield--field"
                name="selectedTime"
                value={this.state.selectedTime}
                onChange={this.handleInputChange}
              >
                <option value="weekday">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="mercedes">Evening</option>
              </select>
            </label>
            <p className="calculator__formfield--helper">
              Helper text that explains the above options
            </p>
          </div>
          <div className="calculator__formfield--wrapper">
            <fieldset className="calculator__formfield">
              <legend className="calculator__formfield--label">
                Where will you purchase the fare?
              </legend>
              <label className="calculator__formfield--field">
                <input
                  type="radio"
                  name="purchaseOnboard"
                  checked={this.state.purchaseOnboard}
                  onChange={this.handleInputChange}
                />
                Onboard
              </label>
              <label className="calculator__formfield--field">
                <input
                  type="radio"
                  name="purchaseKiosk"
                  checked={this.state.purchaseKiosk}
                  onChange={this.handleInputChange}
                />
                Kiosk
              </label>
            </fieldset>
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
                name="numberOfRides"
                className="calculator__formfield--field"
                value={this.state.numberOfRides}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
        </form>
        <div className="calculator__formresult--wrapper">
          <p className="calculator__formresult">
            Your fare will cost <span>this much</span>
          </p>
        </div>
      </div>
    );
  }
}

module.exports = Calculator;
