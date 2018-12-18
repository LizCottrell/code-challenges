var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className="home-container container">
        <h1>Code Challenges</h1>
        <p>Eliza Cottrell</p>
        <hr />
        <h2>Septa Fare Calculator</h2>

        <p>
          The fare calculator currently retrieves its data from a mock server,{' '}
          <a href="https://github.com/typicode/json-server" target="_blank">
            json-server
          </a>
          , that must be running alongside the React app.
        </p>
        <p>
          Run the server by executing the following in the command line:
          <code>
            $ npm install -g json-server
            <br />$ json-server --watch db.json
          </code>
        </p>
        <Link className="button" to="/calculator">
          View the app
        </Link>
      </div>
    );
  }
}

module.exports = Home;
