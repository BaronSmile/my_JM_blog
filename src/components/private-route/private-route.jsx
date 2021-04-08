import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { redirectToSignIn } from '../../api-server/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector(({ loggedIn }) => loggedIn);
  return (
    <Route {...rest} render={(props) => (isLogin ? <Component {...props} /> : <Redirect to={redirectToSignIn()} />)} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
