var React = require('react');
var PropTypes = require('prop-types');
var Select = require('./Select');
var logo = require('../assets/logo.svg');

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      apiData: { info: {}, zones: [] },
      isLoading: false,
      error: null,
      selectedTime: 'weekday',
      selectedZone: '1',
      selectedLocation: 'onboard_purchase',
      selectedRides: '1'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:3000/fares')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data =>
        this.setState({
          apiData: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (value === 'anytime') {
      // require advance purchase for anytime tickets
      this.setState({
        [name]: value,
        selectedLocation: 'advance_purchase',
        selectedRides: '10'
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    const {
      apiData,
      isLoading,
      error,
      selectedTime,
      selectedZone,
      selectedLocation,
      selectedRides
    } = this.state;

    let zones = apiData.zones;
    let info = Object.entries(apiData.info);

    // calculate a single fare
    let singleFare = zones.reduce(function(acc, zone) {
      if (zone.zone == selectedZone) {
        let currFares = zone.fares;
        let currFare = currFares.filter(currFare => {
          if (
            // ride time and purchase location match
            currFare.type === selectedTime &&
            currFare.purchase === selectedLocation
          ) {
            return true;
          }
        });
        let price = currFare[0].price / currFare[0].trips;
        return price;
      } else {
        return acc;
      }
    }, '');

    // calculate total fare
    let fare = (singleFare * selectedRides).toFixed(2);

    if (error) {
      return <p className="error-message">{error.message}</p>;
    }
    if (isLoading) {
      return (
        <img
          className="loading"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
        />
      );
    }
    return (
      <div className="calculator__container">
        <div className="calculator">
          <header className="calculator__header">
            <img className="calculator__header--logo" src={logo} />
            <h2 className="calculator__header--title">Regional Rail Fares</h2>
          </header>
          <form className="calculator__form">
            <Select
              text="Where are you going?"
              selectedZone={selectedZone}
              onSelect={this.handleInputChange}
              zones={zones}
            />

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
                  <label
                    className={
                      selectedTime === 'anytime'
                        ? 'calculator__formfield--field disabled'
                        : 'calculator__formfield--field'
                    }
                  >
                    <input
                      type="radio"
                      name="selectedLocation"
                      value="onboard_purchase"
                      disabled={selectedTime === 'anytime'}
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
                  min={selectedTime === 'anytime' ? '10' : '1'}
                  max="100"
                  step={selectedTime === 'anytime' ? '10' : '1'}
                  name="selectedRides"
                  className="form-control calculator__formfield--field"
                  value={this.state.selectedRides}
                  onChange={this.handleInputChange}
                />
              </label>
              {selectedTime === 'anytime' && (
                <p className="calculator__formfield--helper">
                  <strong>Anytime Tickets</strong> are only available as 10-Trip
                  strips. Advance purchase required.
                </p>
              )}
            </div>
          </form>
          <div className="calculator__formresult--wrapper">
            <p className="calculator__formresult">
              Your fare will cost <span>${fare}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Calculator;
