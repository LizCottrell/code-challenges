var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav__list">
          <li className="nav__list-item">
            <i className="fa fa-bars fa-lg" />
          </li>
          <li className="nav__list-item">
            <NavLink exact activeClassName="active" to="/">
              General Info
            </NavLink>
          </li>
          <li className="nav__list-item">
            <NavLink activeClassName="active" to="/calculator">
              Septa Fare Calculator
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

module.exports = Nav;
