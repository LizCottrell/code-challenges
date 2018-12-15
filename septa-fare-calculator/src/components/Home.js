var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className="home-container container">
        <h1>
          {/* <img src={require('../assets/logo.svg')} /> */}
          Code Challenges
        </h1>
        <p>Eliza Cottrell</p>
        <hr />
        <h2>Septa Fare Calculator</h2>

        <p>Blah Blah Blah</p>
        <Link className="button" to="/calculator">
          View the app
        </Link>
      </div>
    );
  }
}

module.exports = Home;
