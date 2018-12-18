var React = require('react');
var PropTypes = require('prop-types');
var SelectZone = require('./SelectZone');
var SelectTime = require('./SelectTime');
var SelectLocation = require('./SelectLocation');
var SelectRides = require('./SelectRides');
var Results = require('./Results');
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
            <SelectZone
              text="Where are you going?"
              selectedZone={selectedZone}
              onSelect={this.handleInputChange}
              zones={zones}
            />

            <SelectTime
              text="When are you riding?"
              selectedTime={selectedTime}
              onSelect={this.handleInputChange}
              info={info}
            />

            <SelectLocation
              text="Where will you purchase the fare?"
              selectedLocation={selectedLocation}
              selectedTime={selectedTime}
              onSelect={this.handleInputChange}
              info={info}
            />

            <SelectRides
              text="How many rides will you need?"
              selectedRides={selectedRides}
              selectedTime={selectedTime}
              onSelect={this.handleInputChange}
              info={
                '<strong>Anytime Tickets</strong> are only available as 10-Trip strips. Advance purchase required.'
              }
            />
          </form>

          <Results text="Your fare will cost" fare={fare} />
        </div>
      </div>
    );
  }
}

module.exports = Calculator;
