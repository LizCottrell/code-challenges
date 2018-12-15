var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Calculator = require('./Calculator');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Nav />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/calculator" component={Calculator} />
            <Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
