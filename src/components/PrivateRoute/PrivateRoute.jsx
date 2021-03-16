import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import {getFromLocalStorage} from "../../utils/localStorage";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (getFromLocalStorage('token') ? <Component {...props} /> : <Redirect to="/sign-in"/>)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;